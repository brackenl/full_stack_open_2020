const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require("apollo-server");
const mongoose = require("mongoose");
const { v1: uuid } = require("uuid");
const jwt = require("jsonwebtoken");
const { PubSub } = require("apollo-server");

const pubsub = new PubSub();

const config = require("./utils/config");

const Author = require("./models/author");
const Book = require("./models/book");
const User = require("./models/user");

mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

console.log("connecting to", config.MONGODB_URI);

mongoose
  .connect(config.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {
    console.log("error connection to MongoDB:", error.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
    books: [Book!]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
    genre: String!
  }

  type Subscription {
    bookAdded: Book!
  }

  type Query {
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]
    authorCount: Int!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int!): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      const books = await Book.find({});

      if (args.genre && args.author) {
        let relBooks = books.filter((book) => book.genres.includes(args.genre));
        const relAuthor = await Author.findOne({ name: args.author });
        relBooks = relBooks.filter((book) => {
          return book.author.equals(relAuthor._id);
        });
        return relBooks.map(async (book) => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: await Author.findById(book.author),
            id: book.id,
          };
        });
      }

      if (args.genre) {
        const relBooks = books.filter((book) =>
          book.genres.includes(args.genre)
        );
        return relBooks.map(async (book) => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: await Author.findById(book.author),
            id: book.id,
          };
        });
      }

      if (args.author) {
        const relAuthor = await Author.findOne({ name: args.author });
        const relBooks = books.filter((book) => book.author == relAuthor.id);
        return relBooks.map(async (book) => {
          return {
            title: book.title,
            published: book.published,
            genres: book.genres,
            author: await Author.findById(book.author),
            id: book.id,
          };
        });
      }

      return books.map(async (book) => {
        return {
          title: book.title,
          published: book.published,
          genres: book.genres,
          author: await Author.findById(book.author),
          id: book.id,
        };
      });
    },
    authorCount: () => Author.collection.countDocuments(),
    allAuthors: async () => {
      const authors = await Author.find({}).populate("books");
      return authors.map(async (author) => {
        return {
          name: author.name,
          born: author.born,
          id: author.id,
          bookCount: await Book.find({ author: author.id }).countDocuments(),
        };
      });
    },
    me: async (root, args, context) => {
      return context.currentUser;
    },
  },
  Mutation: {
    addBook: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError(
          "You must be authenticated to perform this action"
        );
      }

      console.log("adding new book");
      let relAuthor = await Author.findOne({ name: args.author });
      if (!relAuthor) {
        const newAuth = new Author({
          name: args.author,
        });
        try {
          await newAuth.save();
        } catch (err) {
          throw new UserInputError(err.message, { invalidArgs: args });
        }

        relAuthor = newAuth;
      }
      const book = new Book({ ...args, author: relAuthor.id });
      try {
        await book.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }

      pubsub.publish("BOOK_ADDED", {
        bookAdded: {
          title: book.title,
          published: book.published,
          genres: book.genres,
          author: await Author.findById(book.author),
          id: book.id,
        },
      });
      console.log(book);
      return book;
    },
    editAuthor: async (root, args, context) => {
      if (!context.currentUser) {
        throw new AuthenticationError(
          "You must be authenticated to perform this action"
        );
      }

      const author = await Author.findOne({ name: args.name });
      author.born = args.setBornTo;
      try {
        return author.save();
      } catch (err) {
        throw new UserInputError(err.message, { invalidArgs: args });
      }
    },
    createUser: (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });

      return user.save().catch((error) => {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      });
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });

      if (!user || args.password !== "password") {
        throw new UserInputError("wrong credentials");
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return {
        value: jwt.sign(userForToken, config.SECRET),
        genre: user.favoriteGenre,
      };
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(["BOOK_ADDED"]),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith("bearer ")) {
      const decodedToken = jwt.verify(auth.substring(7), config.SECRET);
      const currentUser = await User.findById(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscriptions ready at ${subscriptionsUrl}`);
});

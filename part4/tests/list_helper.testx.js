const {
  dummy,
  sumLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
} = require("../utils/list_helper");

const blog1 = {
  title: "A blog post",
  author: "An author",
  url: "www.address.com",
  likes: 17,
};

const blog2 = {
  title: "A blog post",
  author: "An author",
  url: "www.address.com",
  likes: 73,
};

const blog3 = {
  title: "A blog post",
  author: "An author",
  url: "www.address.com",
  likes: 0,
};

const blog4 = {
  title: "A blog post",
  author: "An author",
  url: "www.address.com",
  likes: 32,
};

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

test("dummy returns one", () => {
  const blogs = [];
  const result = dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  test("of empty list is zero", () => {
    expect(sumLikes([])).toBe(0);
  });

  test("when list have only one blog equals the likes of that", () => {
    expect(sumLikes([blog1])).toBe(17);
  });

  test("of a bigger list is calculated outright", () => {
    expect(sumLikes([blog1, blog2, blog3, blog4])).toBe(122);
  });
});

describe("favourite blog", () => {
  test("returns 0 for an empty array", () => {
    expect(favouriteBlog([])).toBe(0);
  });

  test("returns the blog with the most likes", () => {
    expect(favouriteBlog([blog1, blog2, blog3, blog4])).toEqual(blog2);
    expect(favouriteBlog(blogs)).toEqual({
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0,
    });
  });
});

describe("most blogs", () => {
  test("returns name and number of blogs of author with most blogs", () => {
    expect(mostBlogs(blogs)).toEqual({
      author: "Robert C. Martin",
      blogs: 3,
    });
  });
});

describe("most likes", () => {
  test("returns name and number of likes of author with most likes", () => {
    expect(mostLikes(blogs)).toEqual({
      author: "Edsger W. Dijkstra",
      likes: 17,
    });
  });
});

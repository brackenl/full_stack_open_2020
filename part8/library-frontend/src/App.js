import React, { useState } from "react";
import {
  useQuery,
  useMutation,
  useSubscription,
  useApolloClient,
} from "@apollo/client";

import { ALL_BOOKS, BOOK_ADDED } from "./queries";

import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Recommended from "./components/Recommended";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [genre, setGenre] = useState(null);
  const [error, setError] = useState(null);
  const client = useApolloClient();

  const existingToken = localStorage.getItem("library-user-token");

  if (existingToken && !token) {
    setToken(existingToken);
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((p) => p.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      console.log(addedBook);
      updateCacheWith(addedBook);
      console.log(`${addedBook.title} has been added!`);
    },
  });

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
  };

  let navRibbon = (
    <div>
      <button onClick={() => setPage("authors")}>authors</button>
      <button onClick={() => setPage("books")}>books</button>
      <button onClick={() => setPage("login")}>login</button>
    </div>
  );

  if (token) {
    navRibbon = (
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        <button onClick={() => setPage("add")}>add book</button>
        <button onClick={() => setPage("recommended")} genre={genre}>
          recommended
        </button>
        <button onClick={logout}>logout</button>
      </div>
    );
  }

  return (
    <div>
      {navRibbon}

      <Authors show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook show={page === "add" && token} />

      <Recommended show={page === "recommended"} genre={genre} />

      {page === "login" ? (
        <LoginForm
          setError={setError}
          setToken={setToken}
          setPage={setPage}
          setGenre={setGenre}
        />
      ) : null}
    </div>
  );
};

export default App;

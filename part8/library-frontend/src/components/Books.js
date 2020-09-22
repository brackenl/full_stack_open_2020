import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [relGenre, setRelGenre] = useState("");
  const result = useQuery(ALL_BOOKS);

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div className="loader">Loading...</div>;
  }

  let books = [];

  let genres = [];

  const getGenres = () => {
    books.map((book) => {
      book.genres.map((genre) => {
        if (!genres.includes(genre)) {
          genres.push(genre);
        }
      });
    });
  };

  if (result.data) {
    books = [...result.data.allBooks];
    getGenres();
  }

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books
            .filter((book) => {
              if (!relGenre) {
                return true;
              }
              return book.genres.includes(relGenre);
            })
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <div>
        {genres.map((genre) => (
          <button
            onClick={() => setRelGenre(genre)}
            key={genre + Math.random() * 1000}
          >
            {genre}
          </button>
        ))}
        <button onClick={() => setRelGenre("")}>all</button>
      </div>
    </div>
  );
};

export default Books;

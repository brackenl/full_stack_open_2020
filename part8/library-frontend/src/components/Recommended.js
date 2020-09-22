import React from "react";
import { useQuery } from "@apollo/client";

import { ALL_BOOKS } from "../queries";

const Recommended = (props) => {
  const result = useQuery(ALL_BOOKS, { variables: { genre: props.genre } });

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div className="loader">Loading...</div>;
  }

  let books = [];

  if (result.data) {
    books = [...result.data.allBooks];
  }

  return (
    <div>
      <h2>recommendations</h2>
      <br />
      <p>
        books in your favourite genre <b>{props.genre}</b>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {/* books
            .filter((book) => book.genres.includes(props.genre))
            .map((a) => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            )) */}
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommended;

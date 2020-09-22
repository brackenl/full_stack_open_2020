import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";

import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries";

const Authors = (props) => {
  const [born, setBorn] = useState("");

  const result = useQuery(ALL_AUTHORS);
  const [updateAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }],
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    updateAuthor({
      variables: { name: e.target.nameSelect.value, setBornTo: Number(born) },
    });

    setBorn("");
  };

  if (!props.show) {
    return null;
  }

  if (result.loading) {
    return <div className="loader">Loading...</div>;
  }
  let authors = [];

  if (result.data) {
    authors = [...result.data.allAuthors];
  }

  return (
    <div>
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {authors.map((a) => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h3>Set birthyear</h3>
        <form onSubmit={handleSubmit}>
          <div>
            <span>name</span>
            <select name="nameSelect">
              {authors.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name}
                </option>
              ))}
            </select>
            <br />
            <span>born</span>
            <input value={born} onChange={(e) => setBorn(e.target.value)} />
          </div>

          <button type="submit">update author</button>
        </form>
      </div>
    </div>
  );
};

export default Authors;

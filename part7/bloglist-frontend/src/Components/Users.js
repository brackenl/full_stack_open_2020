import React from "react";
import { Link } from "react-router-dom";

const Users = (props) => {
  return (
    <div>
      <h3>Users</h3>

      <div>
        <table style={{ width: "300px", margin: "0 auto" }}>
          <thead>
            <tr>
              <th></th>
              <th style={{ fontWeight: "bold" }}>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {props.users.map((user) => {
              return (
                <tr key={user.id}>
                  <td>
                    <Link to={`/users/${user.id}`}>{user.name}</Link>
                  </td>
                  <td>{user.blogs.length}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;

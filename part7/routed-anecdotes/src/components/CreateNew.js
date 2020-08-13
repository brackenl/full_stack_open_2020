import React from "react";
import { useHistory } from "react-router-dom";

import { useField } from "../hooks/index";

const CreateNew = (props) => {
  const { reset: clearContent, ...content } = useField("text");
  const { reset: clearAuthor, ...author } = useField("text");
  const { reset: clearInfo, ...info } = useField("text");

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0,
    });
    history.push("/");
    props.setNote(`You have added "${content.value}"`);
    setTimeout(() => {
      props.setNote("");
    }, 10000);
  };

  const handleReset = (e) => {
    e.preventDefault();
    clearContent();
    clearAuthor();
    clearInfo();
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...content} />
        </div>
        <div>
          author
          <input {...author} />
        </div>
        <div>
          url for more info
          <input {...info} />
        </div>
        <button type="submit">create</button>
        <button onClick={handleReset}>reset</button>
      </form>
    </div>
  );
};

export default CreateNew;

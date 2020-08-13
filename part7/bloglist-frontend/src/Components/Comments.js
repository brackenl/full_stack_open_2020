import React from "react";

const Comments = (props) => {
  const submitComment = (e) => {
    e.preventDefault();
    const content = e.target.commentbox.value;
    props.newComment(props.id, content);
    e.target.commentbox.value = "";
  };

  return (
    <div style={{ width: "300px", margin: "0 auto" }}>
      <h4>Comments</h4>
      {props.comments ? (
        <ul>
          {props.comments.map((comment) => (
            <li key={comment.id} style={{ textAlign: "left" }}>
              {comment.content}
            </li>
          ))}
        </ul>
      ) : (
        <p>Be the first to leave a comment!</p>
      )}
      <h5>Add a comment:</h5>
      <form onSubmit={submitComment}>
        <textarea name="commentbox" />
        <div>
          <button type="submit" style={{ marginLeft: "5px" }}>
            Submit comment
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comments;

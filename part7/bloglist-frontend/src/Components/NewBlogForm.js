import React, { useState } from "react";
import PropTypes from "prop-types";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: "10px 5px",
  },
  textField: {
    width: "20ch",
  },
}));

const NewBlogForm = (props) => {
  const classes = useStyles();

  const [title, setTitle] = useState("");
  const [Url, setUrl] = useState("");

  const addBlog = (event) => {
    event.preventDefault();
    props.submit(title, Url);
    setTitle("");
    setUrl("");
  };

  return (
    <Card style={{ margin: "20px auto", width: "500px" }} className="formDiv">
      <CardContent>
        <h3>New blog</h3>
        <form onSubmit={addBlog}>
          <div>
            <TextField
              id="outlined-basic"
              label="Title"
              variant="outlined"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="titleInput textField"
              size="small"
              color="primary"
            />
          </div>
          <div style={{ marginTop: "10px" }}>
            <TextField
              id="outlined-basic"
              label="URL"
              variant="outlined"
              value={Url}
              onChange={(e) => setUrl(e.target.value)}
              className="urlInput  textField"
              size="small"
              color="primary"
            />
          </div>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
          >
            Submit Blog
          </Button>
          <Button
            onClick={props.toggle}
            variant="contained"
            color="secondary"
            size="small"
            className={classes.button}
          >
            Cancel
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

NewBlogForm.propTypes = {
  submit: PropTypes.func.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default NewBlogForm;

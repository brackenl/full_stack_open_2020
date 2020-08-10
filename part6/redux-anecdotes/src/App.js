import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { inititaliseAnecdotes } from "./reducers/anecdoteReducer";

import Filter from "./components/Filter";
import Notification from "./components/Notification";
import AnecdoteList from "./components/AnecdoteList";
import AnecdoteForm from "./components/AnecdoteForm";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(inititaliseAnecdotes());
  }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  );
};

export default App;

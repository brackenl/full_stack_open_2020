import anecdoteService from "../services/anecdotes";

const reducer = (state = [], action) => {
  switch (action.type) {
    case "ADD_VOTE":
      const updatedAnec = action.data;
      return state.map((anecdote) =>
        anecdote.id === action.data.id ? updatedAnec : anecdote
      );
    case "INIT_ANECDOTES":
      return action.data;
    case "NEW_ANECDOTE":
      const newAnec = action.data;
      return [...state, newAnec];
    default:
      return state;
  }
};

export const addVote = (id) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    const relAnecdote = anecdotes.find((anecdote) => anecdote.id === id);
    const updatedAnec = {
      ...relAnecdote,
      votes: relAnecdote.votes + 1,
    };
    const res = anecdoteService.updateAnecdote(id, updatedAnec);
    dispatch({
      type: "ADD_VOTE",
      data: res,
    });
  };
};

export const newAnecdote = (content) => {
  return async (dispatch) => {
    const newAnec = await anecdoteService.createNew(content);
    dispatch({
      type: "NEW_ANECDOTE",
      data: newAnec,
    });
  };
};

export const inititaliseAnecdotes = (anecdotes) => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INIT_ANECDOTES",
      data: anecdotes,
    });
  };
};

export default reducer;

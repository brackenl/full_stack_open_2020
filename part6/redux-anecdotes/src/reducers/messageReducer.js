const messageReducer = (state = "", action) => {
  switch (action.type) {
    case "SHOW_MESSAGE":
      const message = action.data.anecdote;
      return message;

    case "CLEAR_MESSAGE":
      return "";
    default:
      return state;
  }
};

let notificationTimeout;

export const showMessage = (anecdote, secs) => {
  return async (dispatch) => {
    clearTimeout(notificationTimeout);
    dispatch({
      type: "SHOW_MESSAGE",
      data: {
        anecdote,
      },
    });
    notificationTimeout = setTimeout(() => {
      dispatch({
        type: "CLEAR_MESSAGE",
      });
    }, secs * 1000);
  };
};

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE",
  };
};

export default messageReducer;

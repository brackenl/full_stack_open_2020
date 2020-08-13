const initialState = {
  text: null,
  success: null,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_MESSAGE":
      return { text: action.data.message, success: action.data.success };
    case "CLEAR_MESSAGE":
      return initialState;
    default:
      return state;
  }
};

export const setMessage = (message, success) => {
  return {
    type: "SET_MESSAGE",
    data: {
      message,
      success,
    },
  };
};

export const clearMessage = () => {
  return {
    type: "CLEAR_MESSAGE",
  };
};

export default messageReducer;

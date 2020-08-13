const initialState = {
  username: "",
  password: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return {
        ...state,
        username: action.data.username,
      };
    case "SET_PASSWORD":
      return {
        ...state,
        password: action.data.password,
      };
    case "CLEAR_FORM":
      return { ...state, username: "", password: "" };
    default:
      return state;
  }
};

export const setUsername = (username) => {
  return {
    type: "SET_USERNAME",
    data: {
      username,
    },
  };
};

export const setPassword = (password) => {
  return {
    type: "SET_PASSWORD",
    data: {
      password,
    },
  };
};

export const clearForm = () => {
  return {
    type: "CLEAR_FORM",
  };
};

export default loginReducer;

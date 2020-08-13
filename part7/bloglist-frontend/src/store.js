import { createStore, combineReducers } from "redux";
// import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import loginReducer from "./Reducers/loginReducer";
import userReducer from "./Reducers/userReducer";
import blogReducer from "./Reducers/blogReducer";
import messageReducer from "./Reducers/messageReducer";

const reducer = combineReducers({
  login: loginReducer,
  user: userReducer,
  blogs: blogReducer,
  message: messageReducer,
  //   message: messageReducer,
  //   filter: filterReducer,
});

const store = createStore(reducer, composeWithDevTools());

export default store;

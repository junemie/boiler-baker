import { createStore, applyMiddleware, combineReducers } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// //importing the state from user
import user from "./users";

// //combining the reducer , if there are multiple file with state, I can include here as well.
const reducer = combineReducers({
  user
});

const middleWare = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// //createStore takes in reducer and any middleware
const store = createStore(reducer, middleWare);

export default store;

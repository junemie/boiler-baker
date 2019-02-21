/*creatStore: where we store all of statefull states
1) combineReducer: combines all different state files into one
2) applyMiddleware: redux's middle where everytime action is dispatched it possibly passes down the action or not
3) createLogger: kind of like express middleware morgan
4) thunkMiddleware: thunk creators that usally used to make axios request
5) composeWithDevTools: google dev tool extention.
*/
import { createStore, applyMiddleware, combineReducers } from "redux";
import createLogger from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// //importing the state from user
import user from "./users";

// //combining the reducer , if there are multiple file with state, I can include here as well.
/*
Right now you only have one model but if you have more than 1 model, you want to create reducer file for each model and you can combine them here.
*/
const reducer = combineReducers({
  user
});

const middleWare = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

// //createStore takes in reducer and any middleware
const store = createStore(reducer, middleWare);

export default store;

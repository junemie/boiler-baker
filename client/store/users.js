import axios from "axios";

//USER STATE

//Initial State
const initialState = {
  users: [],
  user: {}
};

//Action
const GET_ALL_USERS = "GET_ALL_USERS";
const GET_USER = "GET_USER";

//Action creator
const gotAllUsers = users => ({
  type: GET_ALL_USERS,
  users
});

const gotMe = user => ({
  type: GET_USER,
  user
});

//---------------THUNK CREATOR--------------

//LOGIN
export const login = formData => {
  return async dispatch => {
    const { data: user } = await axios.put("/auth/login", formData);
    dispatch(gotMe(user));
  };
};

//USER'S HOMEPAGE
export const getMe = () => {
  return async dispatch => {
    const { data: user } = await axios.get("/auth/me");
    dispatch(gotMe(user));
  };
};

//Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return { ...state, users: [...state.users, action.users] };
    case "GET_USER":
      return { ...state, user: action.user };
  }
  return state;
};

export default rootReducer;

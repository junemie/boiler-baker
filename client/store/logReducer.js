import axios from "axios";

//Initial State
const initialState = {
  user: {}
};
//Action
const GET_USER = "GET_USER";

//Action creator
const gotMe = user => ({
  type: GET_USER,
  user
});

export const getMe = () => dispatch => {
  return axios
    .get("/auth/me")
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export const login = formData => dispatch => {
  console.log("this is", formData);
  return axios
    .post("/auth/login", formData)
    .then(res => res.data)
    .then(user => dispatch(gotMe(user)))
    .catch(console.error.bind(console));
};

export function logReducer(state = inistialState, action) {
  switch (action.type) {
    case GET_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}

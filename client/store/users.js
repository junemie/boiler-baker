import axios from "axios";

//USER STATE

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

//---------------THUNK CREATOR--------------

//LOGIN
// export const login = formData => {
//   return async dispatch => {
//     const { data: user } = await axios.put("/auth/login", formData);
//     dispatch(gotMe(user));
//   };
// };

// //USER'S HOMEPAGE
// export const getMe = () => {
//   return async dispatch => {
//     const { data: user } = await axios.get("/auth/me");
//     dispatch(gotMe(user));
//   };
// };

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

//Reducer
// const rootReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case "GET_USER":
//       return action.user;
//   }
//   return state;
// };

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        user: action.user
      };
    default:
      return state;
  }
};

export default rootReducer;

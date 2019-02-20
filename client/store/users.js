//USER STATE

//Initial State
const initialState = {
  users: [],
  user: {}
};

//Action
const GET_ALL_USERS = "GET_ALL_USERS";
const GET_SINGLE_USER = "GET_SINGLE_USER";

//Action creator
const gotAllUsers = users => ({
  type: GET_ALL_USERS,
  users
});

const gotSingleUser = user => ({
  type: GET_SINGLE_USER,
  user
});

//Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_ALL_USERS":
      return { ...state, users: [...state.users, action.users] };
    case "GET_SiNGLE_USER":
      return { ...state, user: action.user };
  }
  return state;
};

export default rootReducer;

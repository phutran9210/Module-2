const initialState = {
  loggedIn: false,
  user: null,
};

const autReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, loggedIn: true, user: action.payload };
    case "LOGOUT_USER":
      return { ...state, loggedIn: false, user: null };
    default:
      return state;
  }
};
export default autReducer;

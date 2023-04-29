const initialState = null;

const selectedMovieIdReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECTED_MOVIE_ID":
      return action.payload;
    default:
      return state;
  }
};

export default selectedMovieIdReducer;

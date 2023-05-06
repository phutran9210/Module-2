import {
  FETCH_MOVIES_SUCCESS,
  FETCH_MOVIES_FAILURE,
  UPDATE_MOVIE,
  FETCH_MOVIES_REQUEST,
  ADD_MOVIE,
  REMOVE_MOVIE,
  SEARCH_MOVIES,
} from "../actions/managerMovies";

const initialState = {
  movies: [],
  loading: false,
  searchText: "",
  error: null,
};

export const dataMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_MOVIES_REQUEST:
      return { ...state, loading: true };
    case FETCH_MOVIES_SUCCESS:
      return { ...state, loading: false, movies: action.payload };
    case FETCH_MOVIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_MOVIE:
      return { ...state, movies: [...state.movies, action.payload] };
    case REMOVE_MOVIE:
      return {
        ...state,
        movies: state.movies.filter((video) => video.id !== action.payload),
      };
    case UPDATE_MOVIE:
      return {
        ...state,
        movies: state.movies.map((movie) =>
          movie.imdbID === action.payload.imdbID
            ? { ...movie, ...action.payload.updatedData }
            : movie
        ),
      };
    case SEARCH_MOVIES:
      return {
        ...state,
        searchText: action.payload,
      };
    default:
      return state;
  }
};

import axios from "axios";
import { message } from "antd";

export const FETCH_MOVIES_REQUEST = "FETCH_MOVIES_REQUEST";
export const FETCH_MOVIES_SUCCESS = "FETCH_MOVIES_SUCCESS";
export const FETCH_MOVIES_FAILURE = "FETCH_MOVIES_FAILURE";
export const UPDATE_MOVIE = "UPDATE_MOVIE";
export const ADD_MOVIE = "ADD_MOVIE";
export const REMOVE_MOVIE = "REMOVE_MOVIE";
export const SEARCH_MOVIES = "SEARCH_MOVIES";

export const searchMovies = (searchText) => ({
  type: SEARCH_MOVIES,
  payload: searchText,
});
export const fetchMoviesRequest = () => ({
  type: FETCH_MOVIES_REQUEST,
});
export const fetchMoviesSuccess = (movies) => ({
  type: FETCH_MOVIES_SUCCESS,
  payload: movies,
});
export const fetchMoviesFailure = (error) => ({
  type: FETCH_MOVIES_FAILURE,
  payload: error,
});
export const updatedMovie = (imdbID, updateData) => ({
  type: UPDATE_MOVIE,
  payload: { imdbID, updateData },
});
export const addMovie = (video) => ({
  type: ADD_MOVIE,
  payload: video,
});
export const removeVideo = (id) => ({
  type: REMOVE_MOVIE,
  payload: id,
});

export const updateMovie = (id, updateData) => {
  return async (dispatch) => {
    try {
      await axios.patch(`http://localhost:3005/movies/${id}`, updateData);
      message.success("Cập nhật thành công");
    } catch (error) {
      message.error("Có lỗi xảy ra : " + error.message);
    }
  };
};

export const addMovieUpdated = (video) => {
  return async (dispatch) => {
    try {
      // console.log("data thunk", video);
      const response = await axios.post("http://localhost:3005/movies", video);

      const addedVideo = response.data;
      dispatch(addMovie(addedVideo));
      message.success("Video đã được thêm thành công.");
    } catch (error) {
      console.error("Có lỗi xảy ra: " + error.message);
    }
  };
};

export const removeVideoFromApi = (id) => {
  return async (dispatch) => {
    try {
      await axios.delete(`http://localhost:3005/movies/${id}`);
      dispatch(removeVideo(id));
      message.success("Video đã được xoá thành công.");
    } catch (error) {
      message.error("Có lỗi xảy ra: " + error.message);
    }
  };
};

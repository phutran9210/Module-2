import axios from "axios";

export const loginUser = (user) => {
  return (dispatch) => {
    localStorage.setItem("loggedUser", JSON.stringify(user.primaryId));
    dispatch({
      type: "LOGIN_USER",
      payload: user.primaryId,
    });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    localStorage.removeItem("loggedUser");
    dispatch({
      type: "LOGOUT_USER",
      payload: null,
    });
  };
};

export const setApiData = (data) => {
  return {
    type: "SET_API_DATA",
    payload: data,
  };
};

export const fetchApiData = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3005/movies");
      dispatch(setApiData(response.data));
    } catch (error) {
      console.error("loi khi lay api", error);
    }
  };
};

export const fetchApiDataUser = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get("http://localhost:3005/users");
      dispatch(setApiData(response.data));
    } catch (error) {
      console.log("loi khi lay userData", error);
    }
  };
};

export const setSelectedMovieId = (movieId) => {
  return {
    type: "SET_SELECTED_MOVIE_ID",
    payload: movieId,
  };
};

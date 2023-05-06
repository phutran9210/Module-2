import axios from "axios";

export const loginUser = (user) => {
  return (dispatch) => {
    localStorage.setItem("loggedUser", user.primaryId);
    dispatch({
      type: "LOGIN_USER",
      payload: user,
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

export const restoreUser = () => {
  return async (dispatch) => {
    const primaryID = localStorage.getItem("loggedUser");

    if (primaryID) {
      try {
        const response = await axios.get("http://localhost:3005/users");

        const users = response.data;

        const user = users.find((user) => user.primaryId === primaryID);

        if (user) {
          dispatch({
            type: "LOGIN_USER",
            payload: user,
          });
        } else {
          console.error("Error: primaryId not found in users");
        }
      } catch (error) {
        console.error("Error: ", error.message);
      }
    }
  };
};

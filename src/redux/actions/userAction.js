import axios from "axios";
import { message } from "antd";
export const FETCH_USERS_REQUEST = "FETCH_USERS_REQUEST";
export const FETCH_USERS_SUCCESS = "FETCH_USERS_SUCCESS";
export const FETCH_USERS_FAILURE = "FETCH_USERS_FAILURE";
export const UPDATE_USER = "UPDATE_USER";

export const fetchUsersRequest = () => ({
  type: FETCH_USERS_REQUEST,
});
export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});
export const fetchUsersFailure = (error) => ({
  type: FETCH_USERS_FAILURE,
  payload: error,
});
export const updateUser = (id, updatedData) => ({
  type: UPDATE_USER,
  payload: { id, updatedData },
});
export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(fetchUsersRequest());
    try {
      const { data } = await axios.get("http://localhost:3005/users");
      dispatch(fetchUsersSuccess(data));
    } catch (error) {
      dispatch(fetchUsersFailure());
      message.error("Có lỗi xảy ra: " + error.message);
    }
  };
};
export const updatePartialUser = (id, updatedData) => {
  return async (dispatch) => {
    try {
      await axios.patch(`http://localhost:3005/users/${id}`, updatedData);
    } catch (error) {
      message.error("Có lỗi xảy ra: " + error.message);
    }
  };
};

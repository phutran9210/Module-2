const initialDataAPI = {
  data: [],
};
const apiDataReducer = (state = initialDataAPI, action) => {
  switch (action.type) {
    case "SET_API_DATA":
      return { ...state, data: action.payload };

    default:
      return state;
  }
};
export default apiDataReducer;

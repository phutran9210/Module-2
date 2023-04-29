import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import autReducer from "./dispatch/rootReducer";
import apiDataReducer from "./dispatch/dataAPI";
import selectedMovieIdReducer from "./dispatch/selectMovie";
import apiDataUser from "./dispatch/dataApiUser";

const rootReducer = combineReducers({
  auth: autReducer,
  apiData: apiDataReducer,
  selectedMovieId: selectedMovieIdReducer,
  apiUser: apiDataUser,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

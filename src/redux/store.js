import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import autReducer from "./rootReducer";
import apiDataReducer from "./dataAPI";
import selectedMovieIdReducer from "./selectMovie";
const rootReducer = combineReducers({
  auth: autReducer,
  apiData: apiDataReducer,
  selectedMovieId: selectedMovieIdReducer,
});
const store = createStore(rootReducer, applyMiddleware(thunk));
export default store;

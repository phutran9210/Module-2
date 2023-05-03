import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import autReducer from "./dispatch/rootReducer";
import apiDataReducer from "./dispatch/dataAPI";
import selectedMovieIdReducer from "./dispatch/selectMovie";
import apiDataUser from "./dispatch/dataApiUser";
import { userReducer } from "./dispatch/userReducer";
import { composeWithDevTools } from "@redux-devtools/extension";
const composeEnhancers = composeWithDevTools({});
const rootReducer = combineReducers({
  auth: autReducer,
  apiData: apiDataReducer,
  selectedMovieId: selectedMovieIdReducer,
  apiUser: apiDataUser,
  user: userReducer,
});
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;

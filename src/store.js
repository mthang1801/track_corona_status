import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
const initalState = {};
const middleware = [thunk];

export default createStore(
  rootReducer,
  initalState,
  composeWithDevTools(applyMiddleware(...middleware))
);

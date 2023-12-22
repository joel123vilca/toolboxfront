import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
const composeEnhancers = composeWithDevTools({});
export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

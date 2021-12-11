import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
const reducer = combineReducers({ signIn });

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();

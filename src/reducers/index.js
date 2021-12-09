import { createStore, combineReducers } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import signIn from "./login";
import getTasks from "./task";
const reducer = combineReducers({ signIn, getTasks });

const store = () => {
  return createStore(reducer, composeWithDevTools());
};

export default store();

import { combineReducers } from 'redux';

import nav from "./NavigationReducer";
import location from "./LocationReducer";
import authentication from "./AuthenticationReducer";

const AppReducer = combineReducers({
  nav,
  location,
  authentication,
});

export default AppReducer;
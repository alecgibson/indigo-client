import { combineReducers } from 'redux';

import nav from "./NavigationReducer";
import location from "./LocationReducer";

const AppReducer = combineReducers({
  nav,
  location,
});

export default AppReducer;
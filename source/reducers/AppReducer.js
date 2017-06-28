import { combineReducers } from 'redux';

import nav from "./NavigationReducer";
import location from "./LocationReducer";
import authentication from "./AuthenticationReducer";
import wildEncounters from "./WildEncounterReducer";

const AppReducer = combineReducers({
  nav,
  location,
  authentication,
  wildEncounters,
});

export default AppReducer;
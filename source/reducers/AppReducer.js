import { combineReducers } from 'redux';

import nav from "./NavigationReducer";
import location from "./LocationReducer";
import authentication from "./AuthenticationReducer";
import wildEncounters from "./WildEncounterReducer";
import battle from "./BattleReducer";

const AppReducer = combineReducers({
  nav,
  location,
  authentication,
  wildEncounters,
  battle,
});

export default AppReducer;
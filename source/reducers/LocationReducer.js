import * as Location from "../actions/Location";

const initialState = null;

export default function location(state = initialState, action) {
  if (action.type !== Location.TYPE) {
    return state;
  }

  return action.location;
}

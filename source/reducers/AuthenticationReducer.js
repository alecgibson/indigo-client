import * as Authentication from "../actions/Authentication";

const initialState = {
  status: Authentication.UNAUTHENTICATED,
};

export default function authentication(state = initialState, action) {
  if (action.type !== Authentication.TYPE) {
    return state;
  }

  return Object.assign({}, state, action.authentication);
}

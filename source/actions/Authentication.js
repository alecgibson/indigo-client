import UserService from "../services/UserService";
import {connect} from "./WebSocket";

// TODO: Dispatch async status for UI

export function register(email, username, password) {
  return function(dispatch) {
    return UserService.register(email, username, password)
      .then(() => {
        dispatch(login(email, password));
      });
  }
}

export function login(emailOrUsername, password) {
  return function(dispatch) {
    return UserService.login(emailOrUsername, password)
      .then((response) => {
        dispatch(connect(response.json.token));
      });
  }
}

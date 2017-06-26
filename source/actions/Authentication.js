import {AsyncStorage} from "react-native";
import UserService from "../services/UserService";
import {connect} from "./WebSocket";
import {navigate} from "./Navigate";

export const TYPE = 'AUTHENTICATION';
export const UNAUTHENTICATED = 'UNAUTHENTICATED';
export const AUTHENTICATING = 'AUTHENTICATING';
export const INVALID_USERNAME_PASSWORD = 'INVALID_USERNAME_PASSWORD';
export const INVALIDATED_SESSION = 'INVALIDATED_SESSION';
export const UNKNOWN_ERROR = 'UNKNOWN_ERROR';
export const TOKEN_STORAGE_KEY = '@Indigo:userSessionToken';

export function restoreAuthenticationSession() {
  return function(dispatch) {
    return AsyncStorage.getItem(TOKEN_STORAGE_KEY)
      .then((error, token) => {
        dispatch(connect(token));
      });
  }
}

export function register(email, username, password) {
  return function(dispatch) {
    dispatch(authenticating());

    // TODO: Handle errors
    return UserService.register(email, username, password)
      .then(() => {
        dispatch(login(email, password));
      });
  }
}

export function login(emailOrUsername, password) {
  return function(dispatch) {
    dispatch(navigate('Loading'));
    dispatch(authenticating());

    return UserService.login(emailOrUsername, password)
      .then((response) => {
        if (response.status === 200) {
          dispatch(connect(response.json.token));
        } else if (response.status === 401) {
          dispatch(incorrectLogin());
          dispatch(navigate('Login'));
        } else {
          dispatch(unknownError());
          dispatch(navigate('Login'));
        }
      });
  }
}

export function authenticating() {
  return {
    type: TYPE,
    authentication: {
      status: AUTHENTICATING,
    },
  }
}

export function incorrectLogin() {
  return {
    type: TYPE,
    authentication: {
      status: UNAUTHENTICATED,
      message: INVALID_USERNAME_PASSWORD,
    },
  };
}

export function invalidatedSession() {
  return {
    type: TYPE,
    authentication: {
      status: UNAUTHENTICATED,
      message: INVALIDATED_SESSION,
    }
  }
}

export function unknownError() {
  return {
    type: TYPE,
    authentication: {
      status: UNAUTHENTICATED,
      message: UNKNOWN_ERROR,
    }
  }
}

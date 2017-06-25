import UserService from "../services/UserService";
import {navigate} from "./Navigate";
import {location} from "./Location";

export const WEB_SOCKET_CONNECTION = 'WEB_SOCKET_CONNECTION';
export const WEB_SOCKET_MESSAGE = 'WEB_SOCKET_MESSAGE';
export const OPEN = 'OPEN';
export const CLOSED = 'CLOSED';

// TODO: Store saved token for bypassing login in future

export function openWebSocket(token) {
  return function(dispatch) {
    let webSocket = UserService.openWebSocket(token);

    webSocket.onopen = () => {
      dispatch(webSocketConnection(OPEN, webSocket));
      dispatch(location());
      dispatch(navigate('Map'));
    };

    webSocket.onmessage = (message) => {
      dispatch(webSocketMessage(message));
    };

    webSocket.onclose = (message) => {
      dispatch(webSocketConnection(CLOSED, webSocket));
    };

    // TODO: Handle errors
  };
}

export function webSocketConnection(status, webSocket) {
  return {
    type: WEB_SOCKET_CONNECTION,
    webSocket: {
      status: status,
      webSocket: webSocket,
    },
  };
}

export function webSocketMessage(message) {
  return {
    type: WEB_SOCKET_MESSAGE,
    message: message,
  };
}

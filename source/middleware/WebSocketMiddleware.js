import {AsyncStorage} from "react-native";
import Config from "../services/Config";
import {location} from "../actions/Location";
import {navigate} from "../actions/Navigate";
import {SEND, CONNECT, DISCONNECT, TYPE, messageReceived} from "../actions/WebSocket";
import {TOKEN_STORAGE_KEY, invalidatedSession, authenticated} from "../actions/Authentication";

const WebSocketMiddleware = (function () {
  let socket = null;
  let userId = null;

  // TODO: Handle errors

  // TODO: Store saved token for bypassing login in future
  function onOpen(store) {
    return () => {
      // TODO: Update state with connection status
    };
  }

  function onClose(store) {
    return () => {
      // TODO: Update state with connection status
    };
  }

  function onMessage(store) {
    return (event) => {
      console.error(event);
      let message = JSON.parse(event.data);
      if (message.type === 'authentication') {
        switch (message.message) {
        case 'SESSION_INVALIDATED':
          console.error("SESSION INVALIDATED");
          store.dispatch(invalidatedSession());
          store.dispatch(navigate('Login'));
          break;
        case 'SESSION_VALIDATED':
          AsyncStorage.setItem(TOKEN_STORAGE_KEY, message.token);
          userId = message.userId;
          store.dispatch(authenticated());
          store.dispatch(location());
          store.dispatch(navigate('Map'));
          break;
        default:
          console.warn('Unknown authentication message: ' + message.message);
        }
      } else {
        store.dispatch(messageReceived(message));
      }
    }
  }

  return store => next => action => {
    if (action.type !== TYPE) {
      return next(action);
    }

    switch (action.method) {
    case CONNECT:
      close(socket);
      let token = action.token || '';
      socket = new WebSocket('ws://' + Config.SERVER_HOST + '?' + token);
      socket.onmessage = onMessage(store);
      socket.onclose = onClose(store);
      socket.onopen = onOpen(store);
      break;
    case DISCONNECT:
      close(socket);
      break;
    case SEND:
      action.message.userId = userId;
      socket.send(JSON.stringify(action.message));
      break;
    default:
      return next(action);
    }
  };

  function close(socket) {
    if (socket) {
      socket.close();
    }
  }
})();

export default WebSocketMiddleware;

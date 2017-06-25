import Config from "../services/Config";
import {location} from "../actions/Location";
import {navigate} from "../actions/Navigate";
import {SEND, CONNECT, DISCONNECT, TYPE, messageReceived} from "../actions/WebSocket";

const WebSocketMiddleware = (function () {
  let socket = null;

  // TODO: Handle errors

  // TODO: Store saved token for bypassing login in future
  function onOpen(store) {
    return () => {
      store.dispatch(location());
      store.dispatch(navigate('Map'));
      // TODO: Update state with connection status
      // TODO: Handle invalid tokens
    };
  }

  function onClose(store) {
    return () => {
      // TODO: Update state with connection status
    };
  }

  function onMessage(store) {
    return (event) => {
      store.dispatch(messageReceived(event.data));
    }
  }

  return store => next => action => {
    if (action.type !== TYPE) {
      return next(action);
    }

    switch (action.method) {
      case CONNECT:
        close(socket);
        socket = new WebSocket('ws://' + Config.SERVER_HOST + '?' + action.token);
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);
        break;
      case DISCONNECT:
        close(socket);
        break;
      case SEND:
        socket.send(action.message);
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

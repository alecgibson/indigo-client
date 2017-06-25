export const TYPE = 'WEB_SOCKET';
export const RECEIVE = 'RECEIVE';
export const SEND = 'SEND';
export const CONNECT = 'CONNECT';
export const DISCONNECT = 'DISCONNECT';

export function connect(token) {
  return {
    type: TYPE,
    method: CONNECT,
    token: token,
  };
}

export function disconnect() {
  return {
    type: TYPE,
    method: DISCONNECT,
  };
}

export function sendMessage(message) {
  return {
    type: TYPE,
    method: SEND,
    message: JSON.stringify(message),
  }
}

export function messageReceived(message) {
  return {
    type: TYPE,
    method: RECEIVE,
    message: JSON.parse(message),
  };
}

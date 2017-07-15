import * as WebSocket from "../actions/WebSocket";

const initialState = {};

export default function battle(state = initialState, action) {
  if (!isBattleMessage(action)) {
    return state;
  }

  return action.message.state;
}

function isBattleMessage(action) {
  return action.type === WebSocket.TYPE
    && action.method === WebSocket.RECEIVE
    && action.message
    && action.message.type === 'battleState';
}

import * as WebSocket from "../actions/WebSocket";

const initialState = {};

export default function battle(state = initialState, action) {
  if (!isBattleMessage(action)) {
    return state;
  }

  const newState = Object.assign({}, state);
  newState.events = newState.events || [];
  newState.events.push(action.message.state);

  if (!newState.currentEvent) {
    newState.currentEvent = newState.events.shift();
  }

  return newState;
}

function isBattleMessage(action) {
  return action.type === WebSocket.TYPE
    && action.method === WebSocket.RECEIVE
    && action.message
    && action.message.type === "battleEvent";
}

import * as WebSocket from "../actions/WebSocket";

const initialState = [];

export default function wildEncounters(state = initialState, action) {
  if (!isWildEncounterMessage(action)) {
    return state;
  }

  return action.message.encounters;
}

function isWildEncounterMessage(action) {
  return action.type === WebSocket.TYPE
    && action.method === WebSocket.RECEIVE
    && action.message
    && action.message.type === 'wildEncounters';
}

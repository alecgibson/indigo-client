import {sendMessage} from "./WebSocket";

export function updateWildEncounters(location) {
  return sendMessage({
    type: 'wildEncounter',
    method: 'getAll',
    location: {
      latitude: location.latitude,
      longitude: location.longitude,
    },
  });
}

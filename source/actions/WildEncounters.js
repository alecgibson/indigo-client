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

export function startWildEncounterBattle(encounterId) {
  return sendMessage({
    type: 'wildEncounter',
    method: 'startBattle',
    encounterId: encounterId,
  });
}

export function startTestWildEncounterBattle() {
  return sendMessage({
    type: 'wildEncounter',
    method: 'testBattle',
  });
}

import {BattleStartOpponent} from "./BattleStartOpponent";

export default class BattleEvents {
  static propsFromState(battleState) {
    const currentEvent = battleState.currentEvent;
    if (!currentEvent) {
      return {
        battle: battleState.state,
      };
    }

    let eventProcessor;
    switch(currentEvent.eventType) {
    case "battleStartOpponent":
      eventProcessor = new BattleStartOpponent();
    }

    return eventProcessor.process(battleState);
  }
}

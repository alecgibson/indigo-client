export default class BattleStartOpponent {
  process(battleState) {
    const currentEvent = battleState.currentEvent;
    const opponentPokemonName = currentEvent.opponentPokemon.name;

    return {
      battle: Object.assign({}, battleState.state, currentEvent.state),
      message: `A wild ${opponentPokemonName} appeared!`,
    };
  }
}

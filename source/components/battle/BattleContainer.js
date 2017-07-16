import React, {Component} from "react";
import {
  Image, StyleSheet, Text, TouchableOpacity,
  View
} from "react-native";
import {connect} from 'react-redux';
import PokeballSpinner from "../PokeballSpinner";
import Sprites from "../sprites/sprites";

class BattleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.battle() && <View style={styles.spinnerWrapper}>
          <PokeballSpinner/>
        </View>}
        {this.battle() && <View style={styles.battleWrapper}>
          <View style={styles.arenaScreen}>
            <Image
              style={styles.arenaBackground}
              source={require('../../../assets/images/battle/arena-grass.png')}
            />
            <Image
              style={styles.arenaPlatformOpponent}
              source={require('../../../assets/images/battle/arena-platform-grass-opponent.png')}
            />
            <Image
              style={styles.arenaPlatformOwn}
              source={require('../../../assets/images/battle/arena-platform-grass-own.png')}
            />
            <Image
              style={styles.opponentPokemon}
              source={Sprites.sprites.pokemon.battle[this.opponentSpeciesId()]['front']}
            />
            <Image
              style={styles.ownPokemon}
              source={Sprites.sprites.pokemon.battle[this.ownSpeciesId()]['back']}
            />
          </View>
          <View style={styles.battleControls}>
            <Image
              style={styles.controlBackground}
              source={require('../../../assets/images/battle/control-background.png')}
            />
            <TouchableOpacity
              onPress={() => console.warn('FIGHT')}
              style={styles.fightButtonWrapper}>
              <Image
                style={styles.fightButton}
                source={require('../../../assets/images/battle/button-fight.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.warn('BAG')}
              style={styles.bagButtonWrapper}>
              <Image
                style={styles.bagButton}
                source={require('../../../assets/images/battle/button-bag.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.warn('RUN')}
              style={styles.runButtonWrapper}>
              <Image
                style={styles.runButton}
                source={require('../../../assets/images/battle/button-run.png')}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => console.warn('POKEMON')}
              style={styles.pokemonButtonWrapper}>
              <Image
                style={styles.pokemonButton}
                source={require('../../../assets/images/battle/button-pokemon.png')}
              />
            </TouchableOpacity>
          </View>
        </View>}
      </View>
    );
  }

  // TODO: Fetch from state/props
  battle() {
    return {
      ownPokemon: {
        name: 'Bulbasaur',
        speciesId: 1,
        gender: 2,
        level: 5,
        stats: {
          hitPoints: 11,
        },
        moves: [
          {
            id: 33,
            name: 'Tackle',
            currentPowerPoints: 35,
            maxPowerPoints: 35,
          }
        ],
        currentValues: {
          hitPoints: 11,
          pp: [35],
        },
      },
      opponentPokemon: {
        name: 'Pidgey',
        speciesId: 16,
        level: 3,
        gender: 1,
        hitPointFraction: 1,
      },
    };
  }

  opponentSpeciesId() {
    return this.zeroPad(this.battle().opponentPokemon.speciesId);
  }

  ownSpeciesId() {
    return this.zeroPad(this.battle().ownPokemon.speciesId);
  }

  zeroPad(number) {
    return ('000' + number).slice(-3);
  }
}

BattleContainer.props = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  spinnerWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  battleWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  arenaScreen: {
    flex: 1,
  },
  arenaBackground: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  arenaPlatformOpponent: {
    position: 'absolute',
    resizeMode: 'contain',
    right: '5%',
    bottom: '30%',
    width: '40%',
    height: '30%',
  },
  arenaPlatformOwn: {
    position: 'absolute',
    resizeMode: 'contain',
    left: '0%',
    bottom: '-10%',
    width: '60%',
    height: '50%',
  },
  opponentPokemon: {
    position: 'absolute',
    resizeMode: 'contain',
    right: '0%',
    bottom: '32%',
    width: '50%',
    height: '40%',
  },
  ownPokemon: {
    position: 'absolute',
    resizeMode: 'contain',
    left: '-5%',
    bottom: '-5%',
    width: '70%',
    height: '60%',
  },
  battleControls: {
    flex: 1,
    backgroundColor: 'black',
  },
  controlBackground: {
    position: 'absolute',
    width: '160%',
    height: '100%',
    top: 0,
    left: '-30%',
    right: '-30%',
    zIndex: -1,
  },
  fightButtonWrapper: {
    alignItems: 'center',
    position: 'absolute',
    height: '10%',
    width: '50%',
    top: '45%',
    left: '25%',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  fightButton: {
    width: '50%',
    height: '70%',
  },
  bagButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '30%',
    height: '28.5%',
  },
  bagButton: {
    width: '100%',
    height: '100%',
  },
  runButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    left: '35.25%',
    width: '29.5%',
    height: '21%',
  },
  runButton: {
    width: '100%',
    height: '100%',
  },
  pokemonButtonWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: '30%',
    height: '28.5%',
  },
  pokemonButton: {
    width: '100%',
    height: '100%',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BattleContainer);

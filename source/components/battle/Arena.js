import React, {Component} from "react";
import {Image, StyleSheet, View} from "react-native";
import Sprites from "../sprites/sprites";
import PropTypes from "prop-types";

export default class Arena extends Component {
  static propTypes = {
    battle: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
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
    );
  }

  opponentSpeciesId() {
    return this.zeroPad(this.props.battle.opponentPokemon.speciesId);
  }

  ownSpeciesId() {
    return this.zeroPad(this.props.battle.ownPokemon.speciesId);
  }

  zeroPad(number) {
    return ('000' + number).slice(-3);
  }
}

const styles = StyleSheet.create({
  container: {
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
});

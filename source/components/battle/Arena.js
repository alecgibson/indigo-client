import React, { Component } from "react";
import { Image, StyleSheet, View } from "react-native";
import Sprites from "../sprites/sprites";
import PropTypes from "prop-types";
import OpponentStatBar from "./OpponentStatBar";
import OwnStatBar from "./OwnStatBar";
import TextBox from "./TextBox";

export default class Arena extends Component {
  opponentSpeciesId() {
    return this.zeroPad(this.props.battle.opponentPokemon.speciesId);
  }

  ownSpeciesId() {
    return this.zeroPad(this.props.battle.ownPokemon.speciesId);
  }

  zeroPad(number) {
    return ('000' + number).slice(-3);
  }

  asPercentage(decimal, denominator = 1) {
    return decimal / denominator * 100 + '%';
  }

  healthBar(hitPointFraction) {
    if (hitPointFraction > 0.5) {
      return require('../../../assets/images/battle/health-bar-green.png');
    } else if (hitPointFraction > 0.2) {
      return require('../../../assets/images/battle/health-bar-yellow.png');
    } else {
      return require('../../../assets/images/battle/health-bar-red.png');
    }
  }

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
        <OpponentStatBar pokemon={this.props.battle.opponentPokemon} />
        <OwnStatBar pokemon={this.props.battle.ownPokemon} />
        {this.props.message && <TextBox text={this.props.message} />}
      </View>
    );
  }
}

Arena.propTypes = {
  battle: PropTypes.object.isRequired,
  message: PropTypes.string,
};

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
    right: '0%',
    bottom: '28%',
    width: '50%',
    height: '40%',
  },
  arenaPlatformOwn: {
    position: 'absolute',
    resizeMode: 'contain',
    left: '-5%',
    bottom: '-15%',
    width: '70%',
    height: '60%',
  },
  opponentPokemon: {
    position: 'absolute',
    resizeMode: 'contain',
    right: '-7%',
    bottom: '31%',
    width: '60%',
    height: '50%',
  },
  ownPokemon: {
    position: 'absolute',
    resizeMode: 'contain',
    left: '-10%',
    bottom: '-10%',
    width: '80%',
    height: '70%',
  },
});

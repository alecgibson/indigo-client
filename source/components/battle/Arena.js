import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
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
        <View style={styles.opponentStatBarContainer}>
          <Image
            style={styles.statBar}
            source={require('../../../assets/images/battle/stat-bar-opponent.png')}
          />
          <View style={[styles.healthBar, styles.opponentHealthBar]}>
            <Image
              style={{height: '100%', width: this.asPercentage(this.props.battle.opponentPokemon.hitPointFraction)}}
              source={this.healthBar(this.props.battle.opponentPokemon.hitPointFraction)}
            />
          </View>
          <Text style={[styles.statText, styles.opponentPokemonName]}>
            {this.props.battle.opponentPokemon.name}
          </Text>
          <Text style={[styles.statText, styles.opponentPokemonLevel]}>
            {this.props.battle.opponentPokemon.level}
          </Text>
        </View>
        <View style={styles.ownStatBarContainer}>
          <Image
            style={styles.statBar}
            source={require('../../../assets/images/battle/stat-bar-own.png')}
          />
        </View>
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

  asPercentage(decimal) {
    return decimal * 100 + '%';
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
  opponentStatBarContainer: {
    position: 'absolute',
    left: '0%',
    top: '10%',
    width: '40%',
    height: '30%',
  },
  healthBar: {
    position: 'absolute',
    height: '2.75%',
    width: '39.5%',
  },
  opponentHealthBar: {
    bottom: '27.5%',
    left: '35%',
  },
  statText: {
    fontFamily: 'Thintel',
    fontSize: 24,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 0},
    textShadowRadius: 3,
  },
  opponentPokemonName: {
    position: 'absolute',
    bottom: '29%',
    left: '5%',
  },
  opponentPokemonLevel: {
    position: 'absolute',
    bottom: '29%',
    left: '75%',
  },
  ownStatBarContainer: {
    position: 'absolute',
    right: '0%',
    bottom: '10%',
    width: '40%',
    height: '40%',
  },
  statBar: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

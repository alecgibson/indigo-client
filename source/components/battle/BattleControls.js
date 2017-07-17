import React, {Component} from "react";
import {Image, StyleSheet, TouchableOpacity, View} from "react-native";
import PropTypes from "prop-types";

export default class BattleControls extends Component {
  static propTypes = {
    battle: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
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

import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import Sprites from "../sprites/sprites";
import PropTypes from "prop-types";
import StatBar from "./StatBar";

export default class OpponentStatBar extends StatBar {
  static propTypes = {
    pokemon: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.statBarContainer}>
        <Image
          style={styles.statBar}
          source={require('../../../assets/images/battle/stat-bar-opponent.png')}
        />
        <View style={styles.healthBar}>
          <Image
            style={{ height: '100%', width: this.asPercentage(this.props.pokemon.hitPointFraction) }}
            source={this.healthBar(this.props.pokemon.hitPointFraction)}
          />
        </View>
        <Text style={[styles.statText, styles.name]}>
          {this.props.pokemon.name}
        </Text>
        <Text style={[styles.statText, styles.level]}>
          {this.props.pokemon.level}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  statBarContainer: {
    position: 'absolute',
    width: '40%',
    height: '40%',
    left: '0%',
    top: '10%',
  },
  healthBar: {
    position: 'absolute',
    height: '2.5%',
    width: '39.5%',
    top: '55%',
    left: '35%',
  },
  statText: {
    fontFamily: 'Thintel',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: 1, height: 0 },
    textShadowRadius: 3,
  },
  name: {
    position: 'absolute',
    top: '45%',
    left: '5%',
  },
  level: {
    position: 'absolute',
    top: '45%',
    left: '75%',
  },
  statBar: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
});

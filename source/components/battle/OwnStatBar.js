import React, { Component } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Sprites from "../sprites/sprites";
import PropTypes from "prop-types";
import StatBar from "./StatBar";

export default class OwnStatBar extends StatBar {
  render() {
    return (
      <View style={styles.statBarContainer}>
        <Image
          style={styles.statBar}
          source={require('../../../assets/images/battle/stat-bar-own.png')}
        />
        <View style={styles.healthBar}>
          <Image
            style={{
              height: '100%',
              width: this.asPercentage(
                this.props.pokemon.currentValues.hitPoints,
                this.props.pokemon.stats.hitPoints,
              ),
            }}
            source={this.healthBar(this.props.pokemon.currentValues.hitPoints / this.props.pokemon.stats.hitPoints)}
          />
        </View>
        <Text style={[styles.statText, styles.name]}>
          {this.props.pokemon.name}
        </Text>
        <Text style={[styles.statText, styles.level]}>
          {this.props.pokemon.level}
        </Text>
        <Text style={[styles.currentHitPoints, styles.statText]}>
          {this.props.pokemon.currentValues.hitPoints}
        </Text>
        <Text style={[styles.totalHitPoints, styles.statText]}>
          {this.props.pokemon.stats.hitPoints}
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
    right: '0%',
    bottom: '10%',
  },
  healthBar: {
    position: 'absolute',
    height: '2.5%',
    width: '39.5%',
    left: '48%',
    bottom: '41%',
  },
  statText: {
    fontFamily: 'Thintel',
    fontSize: 20,
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width: 1, height: 0},
    textShadowRadius: 3,
  },
  name: {
    position: 'absolute',
    left: '12%',
    bottom: '42.5%',
  },
  level: {
    position: 'absolute',
    left: '76%',
    bottom: '42.5%',
  },
  statBar: {
    resizeMode: 'contain',
    width: '100%',
    height: '100%',
  },
  currentHitPoints: {
    position: 'absolute',
    bottom: '31.5%',
    right: '34%',
  },
  totalHitPoints: {
    position: 'absolute',
    left: '76%',
    bottom: '31.5%',
  },
});

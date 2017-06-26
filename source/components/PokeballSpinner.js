import React, {Component} from 'react';
import {Animated, Easing} from "react-native";
import PropTypes from "prop-types";

export default class PokeballSpinner extends Component {
  defaultSize = 50;

  state = {
    spinValue: new Animated.Value(0),
  };

  componentDidMount() {
    this.spin();
  }

  spin() {
    this.state.spinValue.setValue(0);
    Animated.timing(
      this.state.spinValue,
      {
        toValue: 1,
        duration: 1000,
        easing: Easing.linear,
      }
    ).start(() => this.spin());
  }

  render() {
    const spin = this.state.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg'],
    });

    return (
      <Animated.Image
        style={{
          width: this.props.size || this.defaultSize,
          height: this.props.size || this.defaultSize,
          transform: [{rotate: spin}],
        }}
        source = {require('../../assets/images/pokeballFlatSmall.png')}
      />
    )
  }
}

PokeballSpinner.props = {
  size: PropTypes.number,
};

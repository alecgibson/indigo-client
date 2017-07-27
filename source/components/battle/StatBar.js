import React, {Component} from "react";
import {Image, StyleSheet, Text, View} from "react-native";
import Sprites from "../sprites/sprites";
import PropTypes from "prop-types";

export default class StatBar extends Component {
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
}
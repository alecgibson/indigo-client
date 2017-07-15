import React, {Component} from 'react';
import PropTypes from "prop-types";
import BattleContainer from "../components/battle/BattleContainer";

export default class BattleScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    return (
      <BattleContainer/>
    );
  }
}

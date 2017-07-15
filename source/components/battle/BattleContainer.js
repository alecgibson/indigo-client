import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {connect} from 'react-redux';
import PokeballSpinner from "../PokeballSpinner";

class BattleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.spinnerWrapper}>
          <PokeballSpinner/>
        </View>
      </View>
    );
  }
}

BattleContainer.props = {};

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  spinnerWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(BattleContainer);

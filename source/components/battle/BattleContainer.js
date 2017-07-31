import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import {connect} from 'react-redux';
import PokeballSpinner from "../PokeballSpinner";
import Arena from "./Arena";
import BattleControls from "./BattleControls";

class BattleContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        {!this.props.battle && <View style={styles.spinnerWrapper}>
          <PokeballSpinner/>
        </View>}
        {this.props.battle && <View style={styles.battleWrapper}>
          <Arena battle={this.props.battle} message={this.props.message} />
          <BattleControls battle={this.props.battle} />
        </View>}
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    battle: state.battle,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
  spinnerWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  battleWrapper: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    alignContent: 'stretch',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BattleContainer);

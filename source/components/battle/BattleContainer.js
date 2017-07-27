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
        {!this.battle() && <View style={styles.spinnerWrapper}>
          <PokeballSpinner/>
        </View>}
        {this.battle() && <View style={styles.battleWrapper}>
          <Arena battle={this.battle()} />
          <BattleControls battle={this.battle()} />
        </View>}
      </View>
    );
  }

  // TODO: Fetch from state/props
  battle() {
    return {
      ownPokemon: {
        name: 'Bulbasaur',
        speciesId: 1,
        gender: 2,
        level: 5,
        stats: {
          hitPoints: 11,
        },
        moves: [
          {
            id: 33,
            name: 'Tackle',
            currentPowerPoints: 35,
            maxPowerPoints: 35,
          }
        ],
        currentValues: {
          hitPoints: 5,
          pp: [35],
        },
      },
      opponentPokemon: {
        name: 'Pidgey',
        speciesId: 16,
        level: 3,
        gender: 1,
        hitPointFraction: 1,
      },
    };
  }
}

function mapStateToProps(state) {
  return {};
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

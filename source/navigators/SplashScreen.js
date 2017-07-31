import React, {Component} from "react";
import {StyleSheet, View} from "react-native";
import PokeballSpinner from "../components/PokeballSpinner";
import {restoreAuthenticationSession} from "../actions/Authentication";
import PropTypes from "prop-types";

export default class SplashScreen extends Component {
  componentDidMount() {
    this.props.navigation.dispatch(restoreAuthenticationSession());
  }

  render() {
    return (
      <View style={styles.container}>
        <PokeballSpinner/>
      </View>
    );
  }
}

SplashScreen.navigationOptions = {
  header: null,
};

SplashScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
  },
});

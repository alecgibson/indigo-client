import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addNavigationHelpers, StackNavigator } from 'react-navigation';

import LoginScreen from './LoginScreen';
import RegisterScreen from "./RegisterScreen";
import MapScreen from "./MapScreen";
import SplashScreen from "./SplashScreen";
import BattleScreen from "./BattleScreen";

export const AppNavigator = StackNavigator({
  Splash: { screen: SplashScreen },
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Map: { screen: MapScreen },
  Battle: { screen: BattleScreen },
});

const AppWithNavigationState = ({ dispatch, nav }) => (
  <AppNavigator navigation={addNavigationHelpers({ dispatch, state: nav })} />
);

AppWithNavigationState.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(AppWithNavigationState);

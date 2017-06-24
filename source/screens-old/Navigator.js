import React from 'react';
import {addNavigationHelpers, StackNavigator} from "react-navigation";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import LoginScreen from './LoginScreen';
import MapScreen from "./MapScreen";

export const AppNavigator = StackNavigator({
  Login: { screen: LoginScreen },
  // Register: { screen: RegisterScreen },
  Map: { screen: MapScreen },
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

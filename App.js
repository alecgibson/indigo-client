import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MapScreen from './screens/MapScreen';

const IndigoClient = StackNavigator({
  Login: { screen: LoginScreen },
  Register: { screen: RegisterScreen },
  Map: { screen: MapScreen },
});

AppRegistry.registerComponent('IndigoClient', () => IndigoClient);

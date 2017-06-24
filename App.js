import React from 'react';
import {
  AppRegistry,
  Text,
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import MapScreen from './MapScreen';

const IndigoClient = StackNavigator({
  // Login: { screen: LoginScreen },
  // Register: { screen: RegisterScreen },
  Map: { screen: MapScreen },
});

AppRegistry.registerComponent('IndigoClient', () => IndigoClient);

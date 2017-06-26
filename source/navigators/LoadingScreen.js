import React, {Component} from 'react';
import {View, StyleSheet} from "react-native";
import PokeballSpinner from "../components/PokeballSpinner";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '10%',
  },
});

const LoadingScreen = ({navigation}) => (
  <View style={styles.container}>
    <PokeballSpinner />
  </View>
);

export default LoadingScreen;

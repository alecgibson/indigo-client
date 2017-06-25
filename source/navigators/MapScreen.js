import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import Map from "../components/OverworldMap";

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});

const MapScreen = ({ navigation }) => (
  <View style={styles.container}>
    <Map />
  </View>
);

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

MapScreen.navigationOptions = {
  header: null,
};

export default MapScreen;

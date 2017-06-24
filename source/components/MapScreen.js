import React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const MapScreen = ({ navigation }) => (
  <View style={styles.container}>
    <MapView
      ref={ref => { this.map = ref; }}
      style={styles.map}
      initialRegion={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 100,
        longitudeDelta: 100,
      }}
    />
  </View>
);

MapScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

MapScreen.navigationOptions = {
  header: null,
};

export default MapScreen;

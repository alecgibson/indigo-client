import React from 'react';
import {
  StyleSheet,
  View,
  Dimensions,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import PropTypes from 'prop-types';

import MapView from 'react-native-maps';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };

const propTypes = {
  ...MapView.Marker.propTypes,
  // override this prop to make it optional
  coordinate: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }),
  children: PropTypes.node,
  geolocationOptions: PropTypes.shape({
    enableHighAccuracy: PropTypes.bool,
    timeout: PropTypes.number,
    maximumAge: PropTypes.number,
  }),
  heading: PropTypes.number,
  enableHack: PropTypes.bool,
};

const defaultProps = {
  enableHack: false,
  geolocationOptions: GEOLOCATION_OPTIONS,
};

export default class MapScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      position: null,
    };
  }

  componentDidMount() {
    this.mounted = true;

    if (Platform.OS === 'android') {
      PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
        .then((granted) => {
          if (granted && this.mounted) {
            this.watchLocation();
          }
        });
    } else {
      this.watchLocation();
    }
  }

  watchLocation() {
    this.watcher = navigator.geolocation.watchPosition((geolocation) => {
      const lastPosition = this.state.position;
      const position = geolocation.coords;
      if (!this.positionsAreEqual(lastPosition, position)) {
        this.setState({position});
        this.map.animateToRegion(this.mapRegion());
      }
    }, null, this.props.geolocationOptions);
  }

  positionsAreEqual(position1, position2) {
    if (position1 === position2) {
      return true;
    }

    if (!position1 || !position2) {
      return false;
    }

    return position1.latitude === position2.latitude
        && position1.longitude === position2.longitude;
  }

  componentWillUnmount() {
    this.mounted = false;
    if (this.watcher) {
      navigator.geolocation.clearWatch(this.watcher);
    }
  }

  mapRegion() {
    return {
      latitude: this.state.position.latitude,
      longitude: this.state.position.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <MapView
          provider={this.props.provider}
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
  }
}

MapScreen.propTypes = propTypes;
MapScreen.defaultProps = defaultProps;

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

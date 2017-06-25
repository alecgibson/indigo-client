import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class OverworldMap extends Component {
  componentDidUpdate(previousProps) {
    this.map.animateToRegion({
      latitude: this.props.location.coords.latitude,
      longitude: this.props.location.coords.longitude,
      latitudeDelta: 0.002,
      longitudeDelta: 0.002,
    });
  }

  render() {
    return (
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
    );
  }
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

OverworldMap.propTypes = {
  location: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    location: state.location,
  };
}

export default connect(mapStateToProps)(OverworldMap);

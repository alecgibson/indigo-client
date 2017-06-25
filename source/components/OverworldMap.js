import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {updateWildEncounters} from "../actions/WildEncounters";

class OverworldMap extends Component {
  componentDidMount() {
    this.updateWildEncounters();
  }

  componentWillUnmount() {
    clearTimeout(this.wildEncounterPoll);
  }

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

  updateWildEncounters() {
    if (this.props.location) {
      this.props.wildEncounters(this.props.location.coords);
    }

    this.wildEncounterPoll = setTimeout(() => {
      this.updateWildEncounters();
    }, 10000);
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

function mapDispatchToProps(dispatch) {
  return {
    wildEncounters: (location) => {
      dispatch(updateWildEncounters(location));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverworldMap);

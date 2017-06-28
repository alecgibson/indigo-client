import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {updateWildEncounters} from "../actions/WildEncounters";
import MovingSprite from "./sprites/movingSprite";
import Sprites from "./sprites/sprites";

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
        ref={ref => {
          this.map = ref;
        }}
        style={styles.map}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {this.props.location && <MapView.Marker
          coordinate={this.props.location.coords}>
          <MovingSprite
            sprite={Sprites.sprites.trainers.overworld.m}
            bearing={this.props.location.coords.heading}
            speed={this.props.location.coords.speed}
          />
        </MapView.Marker>}
        {
          this.props.wildEncounters.map(encounter => {
            let species = ('000' + encounter.speciesId).slice(-3);
            if (species === '003' || species === '025') {
              species = species + 'm';
            }
            <MapView.Marker
              coordinate={encounter.location}
            >
              <MovingSprite
                sprite={Sprites.sprites.pokemon.overworld[species]}
                bearing={180}
                walkOnTheSpot={true}
              />
            </MapView.Marker>
          })
        }
      </MapView>
    );
  }

  updateWildEncounters() {
    if (this.props.location) {
      this.props.updateWildEncounters(this.props.location.coords);
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
    wildEncounters: state.wildEncounters || [],
  };
}

function mapDispatchToProps(dispatch) {
  return {
    updateWildEncounters: (location) => {
      dispatch(updateWildEncounters(location));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverworldMap);

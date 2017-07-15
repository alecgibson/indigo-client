import React, {Component} from 'react';
import MapView from 'react-native-maps';
import {Button, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {startTestWildEncounterBattle, updateWildEncounters} from "../actions/WildEncounters";
import {navigate} from "../actions/Navigate";
import {startWildEncounterBattle} from "../actions/WildEncounters";
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
        showsMyLocationButton={false}
        showsPointsOfInterest={false}
        showsCompass={true}
        showsScale={false}
        showsBuildings={true}
        showsTraffic={false}
        showsIndoors={false}
        zoomEnabled={false}
        rotateEnabled={false}
        scrollEnabled={false}
        pitchEnabled={false}
        toolbarEnabled={false}
        moveOnMarkerPress={false}
        cacheEnabled={true}
        initialRegion={{
          latitude: 0,
          longitude: 0,
          latitudeDelta: 100,
          longitudeDelta: 100,
        }}
      >
        {this.props.location && <MapView.Marker
          coordinate={this.props.location.coords}
          onPress={() => {
            this.startTestWildEncounterBattle();
          }}>
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
              // TODO: Fetch actual gender
              species = species + 'm';
            }

            // Get a random - but stable - bearing based on the encounter ID
            let bearing = parseInt(encounter.id.substr(encounter.id.length - 1), 16) / 16 * 359;

            return (
              <MapView.Marker
                coordinate={encounter.location}
                key={encounter.id}
                identifier={encounter.id}
                onPress={() => {
                  this.startWildEncounterBattle(encounter.id);
                }}
              >
                <MovingSprite
                  sprite={Sprites.sprites.pokemon.overworld[species]}
                  bearing={bearing}
                  walkOnTheSpot={true}
                />
              </MapView.Marker>
            );
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
    }, 5000);
  }

  startWildEncounterBattle(encounterId) {
    this.props.startWildEncounterBattle(encounterId);
  }

  startTestWildEncounterBattle() {
    this.props.startTestWildEncounterBattle();
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

    startWildEncounterBattle: (encounterId) => {
      dispatch(navigate('Battle'));
      dispatch(startWildEncounterBattle(encounterId));
    },

    startTestWildEncounterBattle: () => {
      dispatch(navigate('Battle'));
      dispatch(startTestWildEncounterBattle());
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OverworldMap);

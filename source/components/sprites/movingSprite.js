import React, {Component} from "react";
import {Image} from "react-native";
import PropTypes from "prop-types";

const Direction = {
  NORTH: 'n',
  EAST: 'e',
  SOUTH: 's',
  WEST: 'w',
};

const Animation = {
  STANDING: '2',
  HEARTBEAT_1: '0',
  HEARTBEAT_2: '1',
};

export default class MovingSprite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      heartbeat: true,
    };
  }

  componentDidMount() {
    this.moveInterval = setInterval(() => {
      this.setState(previousState => {
        return {
          heartbeat: !previousState.heartbeat,
        };
      });
    }, 500);
  }

  componentWillUnmount() {
    clearInterval(this.moveInterval);
  }

  render() {
    return (
      <Image
        source={this.sprite()}
        key={this.sprite()}
        style={{width: 64, height: 64}}
      />
    )
  }

  sprite() {
    // TODO: Add running sprites
    if (this.props.walkOnTheSpot) {
      return this.walkingSprite();
    }

    if (this.props.speed > 1) {
      return this.walkingSprite();
    } else {
      return this.standingSprite();
    }
  }

  standingSprite() {
    let spriteForBearing = this.spriteForCurrentBearing();
    return spriteForBearing[Animation.STANDING] || spriteForBearing[Animation.HEARTBEAT_1];
  }

  walkingSprite() {
    let spriteForBearing = this.spriteForCurrentBearing();
    let heartbeat = this.state.heartbeat ? Animation.HEARTBEAT_1 : Animation.HEARTBEAT_2;
    return spriteForBearing[heartbeat];
  }

  spriteForCurrentBearing() {
    let direction = this.facingQuadrant();
    return this.props.sprite[direction];
  }

  facingQuadrant() {
    let bearing = this.props.bearing;
    if (bearing > 45 && bearing <= 135) {
      return Direction.EAST;
    } else if (bearing > 135 && bearing <= 225) {
      return Direction.SOUTH;
    } else if (bearing > 225 && bearing <= 315) {
      return Direction.WEST;
    } else {
      return Direction.NORTH;
    }
  }
}

MovingSprite.props = {
  sprite: PropTypes.object.isRequired,
  bearing: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
  walkOnTheSpot: PropTypes.bool,
};

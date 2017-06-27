import React, {Component} from "react";
import {Image} from "react-native";
import PropTypes from "prop-types";

const Direction = {
  NORTH: 0,
  EAST: 1,
  SOUTH: 2,
  WEST: 3,
};

export default class MovingSprite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: true,
    };
  }

  componentDidMount() {
    this.moveInterval = setInterval(() => {
      this.setState(previousState => {
        return {
          left: !previousState.left,
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
        style={{width: 16, height: 20}}
      />
    )
  }

  sprite() {
    // TODO: Add running sprites
    if (this.props.speed > 1) {
      return this.walkingSprite();
    } else {
      return this.standingSprite();
    }
  }

  standingSprite() {
    switch(this.facingQuadrant()) {
      case Direction.EAST:
        return this.standRight;
      case Direction.SOUTH:
        return this.standDown;
      case Direction.WEST:
        return this.standLeft;
      default:
        return this.standUp;
    }
  }

  walkingSprite() {
    switch(this.facingQuadrant()) {
      case Direction.EAST:
        return this.state.left ? this.walkRightLeft : this.walkRightRight;
      case Direction.SOUTH:
        return this.state.left ? this.walkDownLeft : this.walkDownRight;
      case Direction.WEST:
        return this.state.left ? this.walkLeftLeft : this.walkLeftRight;
      default:
        return this.state.left ? this.walkUpLeft : this.walkUpRight;
    }
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
  bearing: PropTypes.number.isRequired,
  speed: PropTypes.number.isRequired,
};

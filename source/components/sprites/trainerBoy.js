import React, {Component} from "react";
import {Image} from "react-native";

export default class TrainerBoy extends Component {
  constructor(props) {
    super(props);
    this.state = {
      left: true,
    };

    setInterval(() => {
      this.setState(previousState => {
        return {
          left: !previousState.left,
        };
      });
    }, 500);
  }

  render() {
    if (this.state.left) {
      return (
        <Image
          source={require('../../../assets/images/sprites/trainerBoy/walkUpLeft.png')}
          style={{height: 20, width: 16}}
        />
      );
    } else {
      return (
        <Image
          source={require('../../../assets/images/sprites/trainerBoy/walkUpRight.png')}
          style={{height: 20, width: 16}}
        />
      );
    }
  }
}

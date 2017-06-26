import React, {Component} from 'react';
import PropTypes from "prop-types";

import LoginForm from "../components/LoginForm";

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    return (
      <LoginForm/>
    );
  }
}

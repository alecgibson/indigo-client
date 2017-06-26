import React, {Component} from "react";
import {Button, StyleSheet, Text, TextInput, View} from "react-native";
import {AUTHENTICATING, UNAUTHENTICATED, login} from "../actions/Authentication";
import {navigate} from "../actions/Navigate";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import PokeballSpinner from "./PokeballSpinner";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            {this.props.authenticationStatus === UNAUTHENTICATED && this.props.authenticationMessage}
          </Text>
        </View>
        <TextInput
          style={styles.textInput}
          placeholder="Username or email"
          onChangeText={(username) => this.state.username = username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.state.password = password}
        />
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="Login"
            onPress={() => this.props.login(this.state.username, this.state.password)}
            disabled={this.props.authenticationStatus !== UNAUTHENTICATED}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="Register"
            onPress={() => this.props.register()}
            disabled={this.props.authenticationStatus !== UNAUTHENTICATED}
          />
        </View>
        <View style={styles.spinnerWrapper}>
          {this.props.authenticationStatus === AUTHENTICATING && <PokeballSpinner/>}
        </View>
      </View>
    );
  }
}

LoginForm.props = {
  authenticationMessage: PropTypes.string,
  authenticationStatus: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authenticationMessage: state.authentication.message,
    authenticationStatus: state.authentication.status,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    login: (username, password) => dispatch(login(username, password)),
    register: () => dispatch(navigate('Register')),
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    padding: '10%',
  },
  errorContainer: {
    marginTop: 150,
  },
  errorText: {
    color: '#cc0000',
  },
  textInput: {
    flex: 0,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {},
  spinnerWrapper: {
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

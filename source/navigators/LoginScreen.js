import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Button} from 'react-native';
import PropTypes from "prop-types";

import {navigate} from "../actions/Navigate";
import {login} from "../actions/Authentication";
import LoginError from "../components/LoginError";

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  render() {
    return (
      <View style={styles.container}>
        <LoginError />
        <TextInput
          style={styles.textInput}
          placeholder="Username or email"
          onChangeText={(username) => this.username = username}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.password = password}
        />
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="Login"
            onPress={() => this.props.navigation.dispatch(login(this.username, this.password))}
          />
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            style={styles.button}
            title="Register"
            onPress={() => this.props.navigation.dispatch(navigate('Register'))}
          />
        </View>
      </View>
    );
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
  textInput: {
    flex: 0,
  },
  buttonWrapper: {
    marginTop: 10,
  },
  button: {},
});

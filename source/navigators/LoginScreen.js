import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import PropTypes from "prop-types";

import {navigate} from "../actions/Navigate";
import {login} from "../actions/Authentication";

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
  button: {
    marginTop: 30,
  }
});

const LoginScreen = ({ navigation }) => (
  <View style={styles.container}>
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
    <Button
      style={styles.button}
      title="Login"
      onPress={() => navigation.dispatch(login(this.username, this.password))}
    />
    <Button
      style={styles.button}
      title="Register"
      onPress={() => navigation.dispatch(navigate('Register'))}
    />
  </View>
);

LoginScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

LoginScreen.navigationOptions = {
  header: null,
};

export default LoginScreen;

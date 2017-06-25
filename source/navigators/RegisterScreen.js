import React from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import PropTypes from "prop-types";

import {register} from "../actions/Authentication";

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

const RegisterScreen = ({ navigation }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.textInput}
      placeholder="Email"
      onChangeText={(email) => this.email = email}
    />
    <TextInput
      style={styles.textInput}
      placeholder="Username"
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
      title="Register"
      onPress={() => navigation.dispatch(register(this.email, this.username, this.password))}
    />
  </View>
);

RegisterScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};

RegisterScreen.navigationOptions = {
  header: null,
};

export default RegisterScreen;

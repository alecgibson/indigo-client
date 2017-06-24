import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';
import PropTypes from "prop-types";

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
    {/*<TextInput*/}
      {/*style={styles.textInput}*/}
      {/*placeholder="Username or email"*/}
      {/*onChangeText={(username) => this.setState({username})}*/}
    {/*/>*/}
    {/*<TextInput*/}
      {/*style={styles.textInput}*/}
      {/*placeholder="Password"*/}
      {/*secureTextEntry={true}*/}
      {/*onChangeText={(password) => this.setState({password})}*/}
    {/*/>*/}
    <Button
      style={styles.button}
      title="Login"
      onPress={() => navigation.dispatch({ type: 'Login' })}
    />
    <Button
      style={styles.button}
      title="Register"
      onPress={() => navigation.dispatch({ type: 'Register' })}
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

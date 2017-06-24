import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export default class RegisterScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
    };
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.textInput}
          placeholder="Email"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Username"
          onChangeText={(username) => this.setState({username})}
        />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          style={styles.button}
          title="Register"
          onPress={() => {this.registerAndAuthenticate();}}
        />
      </View>
    );
  }

  registerAndAuthenticate() {
    this.register()
      .then(() => {
        return this.login();
      })
      .then((response) => {
        let ws = new WebSocket('ws://192.168.1.106:8080?' + response.token);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  register() {
    // TODO: Move this host global
    return fetch('http://192.168.1.106:8080/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        username: this.state.username,
        password: this.state.password,
      })
    });
  }

  login() {
    return fetch('http://192.168.1.106:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
      })
    });
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
  button: {
    marginTop: 10,
  }
});

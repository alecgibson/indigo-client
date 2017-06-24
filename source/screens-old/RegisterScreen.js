import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button, Alert } from 'react-native';
import UserService from "../services/UserService";

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
    UserService.register(this.state.email, this.state.username, this.state.password)
      .then(() => {
        return UserService.login(this.state.username, this.state.password);
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

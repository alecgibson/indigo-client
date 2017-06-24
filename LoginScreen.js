import React, { Component } from 'react';
import { StyleSheet, TextInput, View, Button } from 'react-native';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
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
          placeholder="Username or email"
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
          title="Login"
          onPress={() => {this.login();}}
        />
        <Button
          style={styles.button}
          title="Register"
          onPress={() => navigate('Register')}
        />
      </View>
    );
  }

  login() {

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
    marginTop: 30,
  }
});

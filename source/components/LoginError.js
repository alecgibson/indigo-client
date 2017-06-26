import React, {Component} from 'react';
import {StyleSheet, Text, View} from "react-native";
import { connect } from 'react-redux';

class LoginError extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.message}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  text: {
    color: '#cc0000',
  },
});

function mapStateToProps(state) {
  return {
    status: state.authentication.status,
    message: state.authentication.message,
  };
}

export default connect(mapStateToProps)(LoginError);

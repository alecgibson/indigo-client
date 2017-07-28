import React, {Component} from "react";
import {StyleSheet, Text, View} from "react-native";
import PropTypes from "prop-types";

export default class TextBox extends Component {
  render() {
    return (
      <View style={[styles.container]}>
        <Text style={[styles.text]}>
          {this.props.text}
        </Text>
      </View>
    );
  }
}

TextBox.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: "2.5%",
    borderColor: "#eee",
    borderBottomWidth: 2,
    borderTopWidth: 2,
    left: 0,
    right: 0,
    height: "25%",
    backgroundColor: "black",
    opacity: 0.8,
  },
  text: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: "3%",
    fontFamily: "Thintel",
    fontSize: 40,
    color: "white",
  },
});

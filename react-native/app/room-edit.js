import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';

class RoomEdit extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Editing {this.props.title}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FBFBFB',
  },
  gridItem: {
    width: 60,
    height: 60,
    backgroundColor: '#FF0000'
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  }
});

export default RoomEdit;

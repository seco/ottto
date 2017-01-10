import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';

class RoomsMenu extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Rooms A</Text>
        <Text>Rooms B</Text>
        <Text>Rooms C</Text>
        <Text>Rooms D</Text>
        <Text>Rooms E</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // position: 'absolute',
    // left: 0,
    // bottom: 49,
    // right: 0,
    // height: 100,
    // backgroundColor: 'red',
  }
});

export default RoomsMenu;

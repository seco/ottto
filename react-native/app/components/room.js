import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import RoomModules from './room-modules';


class Room extends Component {
  render() {
    return (
      <View style={styles.container}>
        <RoomModules room={this.props.room} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20
  }
});


export default Room;

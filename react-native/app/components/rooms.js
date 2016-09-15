import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS,
  ListView,
  View,
  Text
} from 'react-native';
import Room from './room';
import RoomEdit from './room-edit';

class Rooms extends Component {
  _editRoom(room) {
    console.log('here');
  }

  render() {
    const rooms = [
      { id: 3, name: 'Living Room' }
    ];

    const routes = [
      {
        title: rooms[0].name,
        component: Room,
        passProps: rooms[0],
        rightButtonTitle: 'Edit Room',
        wrapperStyle: {flex: 1, backgroundColor: '#FBFBFB'},
        onRightButtonPress: () =>
          this.refs.navigator.push({
            title: room[0].title,
            component: RoomEdit
          })
      }
    ];

    return (
      <NavigatorIOS
        ref='navigator'
        initialRoute={routes[0]}
        barTintColor='#FFFFFF'
        style={{flex: 1}}>
      </NavigatorIOS>
    )
  }
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 20,
    shadowOpacity: 0.05,
    shadowColor: '#000000',
  },
  title: {
    padding: 10,
    fontSize: 18
  },
  headerButton: {
    padding: 10,
    fontSize: 18
  }
});

export default Rooms;

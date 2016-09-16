import React, { Component } from 'react';
import {
  StyleSheet,
  NavigatorIOS,
  ListView,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import Room from './room';


class Rooms extends Component {
  rooms = [
    { id: 3, name: 'Living Room' },
    { id: 5, name: 'Kitchen' },
    { id: 7, name: 'Bedroom' },
  ]


  render() {
    const route = {
      title: 'Rooms',
      component: RoomsList,
      passProps: { rooms: this.rooms },
      rightButtonTitle: 'Edit Room',
      wrapperStyle: styles.container,
      onRightButtonPress: () =>
        this.refs.navigator.push({
          title: room[0].title,
          component: RoomEdit
        })
    }

    return (
      <NavigatorIOS
        ref='navigator'
        initialRoute={route}
        barTintColor='#FFFFFF'
        style={{flex: 1}}>
      </NavigatorIOS>
    )
  }
}


class RoomsList extends Component {
  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    });

    return (
      <ListView
        renderRow={this.renderRoom.bind(this)}
        dataSource={dataSource.cloneWithRows(this.props.rooms)}>
      </ListView>
    )
  }


  renderRoom(room) {
    return (
      <TouchableHighlight
        key={room.id}
        onPress={this.roomPress.bind(this, room)}
        underlayColor='#eee'>
        <Text>{room.name}</Text>
      </TouchableHighlight>
    )
  }


  roomPress(room) {
    this.props.navigator.push({
      title: room.name,
      component: Room,
      passProps: { room },
      onRightButtonPress: () => {
        this.refs.navigator.push({
          title: room[0].title,
          component: RoomEdit
        });
      }
    })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
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

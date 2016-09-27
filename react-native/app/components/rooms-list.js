import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import Room from './room';


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
        <View>
          <View style={styles.listTextContainer}>
            <FontAwesome name={room.icon} style={styles.listIcon} />
            <Text style={styles.listText}>{room.name}</Text>
          </View>
          <View style={styles.listSeparator}></View>
        </View>
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
  listTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15
  },
  listIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
    lineHeight: 24,
    backgroundColor: 'gray',
    borderRadius: 3,
    color: 'white',
    textAlign: 'center'
  },
  listSeparator: {
    height: 1,
    marginLeft: 15,
    backgroundColor: '#EEEEEE'
  }
});


export default RoomsList;

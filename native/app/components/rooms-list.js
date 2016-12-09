import React, { Component } from 'react'
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import FontAwesome from 'react-native-vector-icons/FontAwesome'

import * as roomActions from '../actions/rooms'
import Room from './room'


class RoomsList extends Component {
  render() {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })

    if (this.props.rooms.length) {
      return (
        <ListView
          renderRow={this.renderRoom.bind(this)}
          dataSource={dataSource.cloneWithRows(this.props.rooms)}
          enableEmptySections={true}>
        </ListView>
      )
    } else {
      return (
        <View style={styles.emptyContainer}>
          <Text>You have no rooms...</Text>
        </View>
      )
    }
  }


  renderRoom(room) {
    return (
      <TouchableHighlight
        key={room.id}
        onPress={this.roomPress.bind(this, room)}
        underlayColor='#eee'>
        <View>
          <View style={styles.listTextContainer}>
            
            <Text style={styles.listText}>{room.name}</Text>
            <TouchableHighlight style={styles.listDelete}
              onPress={this.deletePress.bind(this, room)}>
              <View/>
            </TouchableHighlight>
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
        })
      }
    })
  }


  deletePress(room) {
    this.props.removeRoom(room)
  }
}


const styles = StyleSheet.create({
  listTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  listIcon: {
    marginRight: 10,
    width: 24,
    height: 24,
    lineHeight: 24,
    backgroundColor: 'gray',
    borderRadius: 3,
    color: 'white',
    textAlign: 'center',
  },
  listText: {
    flex: 1,
  },
  listDelete: {
    width: 24,
    height: 24,
    backgroundColor: 'red',
    borderRadius: 12,
  },
  listSeparator: {
    height: 1,
    marginLeft: 15,
    backgroundColor: '#EEEEEE',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#EEEEEE',
    alignItems: 'center',
    justifyContent: 'center',
  }
})


export default connect(
  (state) => ( state.rooms ),
  (dispatch) => ( bindActionCreators(roomActions, dispatch) )
)(RoomsList)

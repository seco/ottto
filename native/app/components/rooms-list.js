import React, { Component } from 'react'
import { ListView, StyleSheet, Text, TouchableHighlight, View } from 'react-native'
import { Actions } from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as roomActions from '../actions/rooms'


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
            {/* <TouchableHighlight style={styles.listDelete}
              onPress={this.deletePress.bind(this, room)}>
              <Icon style={styles.listItemDelete}
                name="times-circle-o" size={24} />
            </TouchableHighlight> */}
          </View>
          <View style={styles.listSeparator}></View>
        </View>
      </TouchableHighlight>
    )
  }


  roomPress(room) {
    Actions.room({ title: room.name, room })
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
  listItemDelete: {
    color: '#c00',
  },
  listSeparator: {
    height: 1,
    marginLeft: 15,
    backgroundColor: '#EEEEEE',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
})


export default connect(
  (state) => ( state.rooms ),
  (dispatch) => ( bindActionCreators(roomActions, dispatch) )
)(RoomsList)

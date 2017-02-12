import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRooms } from '../../actions/rooms'
import { Actions } from 'react-native-router-flux'

import { ListView, TouchableHighlight, Text, View, StyleSheet } from 'react-native'


class Rooms extends Component {
  componentWillMount() {
    this.props.getRooms()
  }

  render() {
    const renderContent = this.props.rooms.length
      ? this.renderRooms
      : this.renderNone

    return (
      <View style={styles.container}>
        {renderContent.bind(this, this.props.rooms)()}
      </View>
    )
  }

  renderRooms(rooms) {
    var dataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    })

    return (
      <ListView
        renderRow={this.renderRoom.bind(this)}
        dataSource={dataSource.cloneWithRows(rooms)}
        enableEmptySections={true}>
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


  renderNone() {
    return (
      <View style={styles.emptyContainer}>
        <Text>You have no rooms...</Text>
      </View>
    )
  }


  roomPress(room) {
    Actions.room({ title: room.name, room })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  },
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
  },
})


export default connect(
  (state) => ({ rooms: state.rooms.rooms }),
  (dispatch) => bindActionCreators({ getRooms }, dispatch)
)(Rooms)

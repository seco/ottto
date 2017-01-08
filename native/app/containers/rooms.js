import React, { Component } from 'react'
import { View, AlertIOS, NavigatorIOS, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'

import RoomsList from '../components/rooms-list'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getRooms } from '../actions/rooms'


class Rooms extends Component {
  componentWillMount() {
    this.props.getRooms()
  }

  render() {
    return (
      <View style={styles.container}>
        <RoomsList />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
  }
})


export default connect(
  (state) => ( {} ),
  (dispatch) => ( bindActionCreators({ getRooms }, dispatch) )
)(Rooms)

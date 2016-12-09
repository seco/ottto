import React, { Component } from 'react'
import {
  AlertIOS,
  NavigatorIOS,
  StyleSheet,
} from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import * as roomActions from '../actions/rooms'
import RoomsList from '../components/rooms-list'


class Rooms extends Component {
  componentDidMount() {
    this.props.getRooms()
  }

  onAddPress() {
    AlertIOS.prompt(
      'Room name?',
      null,
      (name) => this.props.addRoom({ name, icon: 'bed' })
    )
  }


  render() {
    const route = {
      title: 'Rooms',
      component: RoomsList,
      wrapperStyle: styles.container,
      rightButtonTitle: 'Add',
      onRightButtonPress: this.onAddPress.bind(this),
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 64,
    backgroundColor: '#FBFBFB'
  }
})


export default connect(
  (state) => ( {} ),
  (dispatch) => ( bindActionCreators(roomActions, dispatch) )
)(Rooms)

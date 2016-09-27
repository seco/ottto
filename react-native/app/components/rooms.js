import React, { Component } from 'react';
import {
  NavigatorIOS,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as roomActions } from '../actions/rooms';
import RoomsList from './rooms-list';
import Room from './room';


class Rooms extends Component {
  render() {
    const route = {
      title: 'Rooms',
      component: RoomsList,
      passProps: { rooms: this.props.rooms },
      wrapperStyle: styles.container
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
    backgroundColor: '#FBFBFB'
  }
});


// export default Rooms;

export default connect(
  (state) => ({ rooms: state.rooms }),
  (dispatch) => ( bindActionCreators(roomActions, dispatch) )
)(Rooms);

import React, { Component } from 'react';
import { Text, AlertIOS } from 'react-native';
import { Router, Scene, Actions, Modal } from 'react-native-router-flux';

import ScenesScene from './containers/scenes';
import Rules from './containers/rules';

import Rooms from './containers/rooms';
import RoomsAdd from './containers/rooms-add';
import RoomsDetail from './containers/rooms-detail';
// import RoomsMenu from './containers/rooms-menu';

import Modules from './containers/modules';
import Settings from './containers/settings';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { addRoom } from './actions/rooms'


class Scenes extends Component {
  render() {
    return (
      <Router>
        <Scene key="modal" component={Modal}>
          <Scene key="root" tabs>
            <Scene key="scenes"
              component={ScenesScene}
              title="Scenes"
              icon={this.renderTab}
            />

            <Scene key="rules"
              component={Rules}
              title="Rules"
              icon={this.renderTab}
            />

            <Scene key="roomsScene"
              title="Rooms"
              icon={this.renderTab}
              initial>

              <Scene key="rooms"
                component={Rooms}
                title="Rooms"
                rightTitle="Add"
                onRight={() => { Actions.roomsAdd() }}
              />

              <Scene key="room"
                component={RoomsDetail}
                title="Room"
                rightTitle="Edit"
                onRight={() => { alert('edit') }}
              />
            </Scene>

            <Scene key="modules"
              component={Modules}
              title="Modules"
              icon={this.renderTab}
            />

            <Scene key="settings"
              component={Settings}
              title="Settings"
              icon={this.renderTab}
            />
          </Scene>

          <Scene key="roomsAdd"
            component={RoomsAdd}
            title="Add Room"
            leftTitle="Cancel"
            onLeft={Actions.rooms}
          />
        </Scene>
      </Router>
    )
  }

  renderTab({selected, title}) {
    return (
      <Text>{title}</Text>
    )
  }
}


export default connect(
  (state) => ( {} ),
  (dispatch) => ( bindActionCreators({ addRoom }, dispatch) )
)(Scenes)

import React, { Component } from 'react';
import {
  StyleSheet,
  TabBarIOS,
  Text,
  View,
} from 'react-native';

import Scenes from '../components/scenes';
import Rules from '../components/rules';
import Rooms from '../components/rooms';
import RoomsMenu from '../components/rooms-menu';
import Modules from '../components/modules';
import Settings from '../components/settings';


class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tab: 'rooms'
    }
  }


  render() {
    return (
      <View style={styles.container}>
        <TabBarIOS
          tintColor="#333333"
          barTintColor="#FFFFFF">
          <TabBarIOS.Item
            title="Scenes"
            selected={this.state.tab === 'scenes'}
            onPress={() => { this.setState({ ...this.state, tab: 'scenes' }) }}>
            <Scenes/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Rules"
            selected={this.state.tab === 'rules'}
            onPress={() => { this.setState({ ...this.state, tab: 'rules' }) }}>
            <Rules/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Rooms"
            selected={this.state.tab === 'rooms'}
            onPress={() => { this.setState({ ...this.state, tab: 'rooms' }) }}>
            <Rooms/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Modules"
            selected={this.state.tab === 'modules'}
            onPress={() => { this.setState({ ...this.state, tab: 'modules' }) }}>
            <Modules/>
          </TabBarIOS.Item>

          <TabBarIOS.Item
            title="Settings"
            selected={this.state.tab === 'settings'}
            onPress={() => { this.setState({ ...this.state, tab: 'settings' }) }}>
            <Settings/>
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});


export default Main;

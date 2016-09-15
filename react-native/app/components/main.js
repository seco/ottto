import React, { Component } from 'react';
import { TabBarIOS } from 'react-native';
import Scenes from './scenes';
import Rules from './rules';
import Rooms from './rooms';
import Users from './users';
import Settings from './settings';

class Main extends Component {
  state = {
    selected: 'rooms'
  };

  componentDidMount() {
    this.setState({ selectedTab: 'rooms' })
  };

  render() {
    return (
      <TabBarIOS
        tintColor="#333333"
        barTintColor="#FFFFFF">
        <TabBarIOS.Item
          title="Scenes"
          selected={this.state.selectedTab === 'scenes'}
          onPress={() => { this.setState({ selectedTab: 'scenes' }) }}>
          <Scenes/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Rules"
          selected={this.state.selectedTab === 'rules'}
          onPress={() => { this.setState({ selectedTab: 'rules' }) }}>
          <Rules/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Rooms"
          selected={this.state.selectedTab === 'rooms'}
          onPress={() => { this.setState({ selectedTab: 'rooms' }) }}>
          <Rooms/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Users"
          selected={this.state.selectedTab === 'users'}
          onPress={() => { this.setState({ selectedTab: 'users' }) }}>
          <Users/>
        </TabBarIOS.Item>

        <TabBarIOS.Item
          title="Settings"
          selected={this.state.selectedTab === 'settings'}
          onPress={() => { this.setState({ selectedTab: 'settings' }) }}>
          <Settings/>
        </TabBarIOS.Item>
      </TabBarIOS>
    );
  }
}

export default Main;

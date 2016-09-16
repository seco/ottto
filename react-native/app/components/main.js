import React, { Component } from 'react';
import {
  LayoutAnimation,
  StyleSheet,
  TabBarIOS,
  View,
  Text
} from 'react-native';
import Scenes from './scenes';
import Rules from './rules';
import Rooms from './rooms';
import RoomsMenu from './rooms-menu';
import Modules from './modules';
import Settings from './settings';

class Main extends Component {
  state = {
    selected: 'rooms'
  };

  componentWillMount() {
    this.setState({
      tab: 'rooms',
      menu: false
    });
  }


  toggleMenu(menu) {
    if (this.state.menu && this.state.menu == menu) {
      this.setState({ ...this.state, menu: false });
    } else {
      this.setState({ ...this.state, menu });
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

  // renderMenu() {
  //   var Menu = this.state.menu;
  //
  //   if(Menu) {
  //     return (
  //       <Menu style={styles.menu} />
  //     )
  //   }
  // }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  // menu: {
  //   flex: 1,
  //   position: 'absolute',
  //   left: 0,
  //   top: 0,
  //   width: 100,
  //   height: 100,
  //   backgroundColor: '#0F0'
  // }
});

export default Main;

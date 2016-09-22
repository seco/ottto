import React, { Component } from 'react';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import GridView from './grid-view';
import ModuleOverlay from './module-overlay'


class RoomModules extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: false
    }
  }


  render() {
    var items = [
      { id: 1, name: 'People', type: { name: 'Presence Sensor' }, icon: true },
      { id: 2, name: 'Motion', type: { name: 'Motion Sensor' }, icon: true },
      { id: 3, name: '', icon: false },
      { id: 4, name: 'Thermostat', type: { name: 'Temperature Controller' }, icon: true },
      { id: 5, name: 'Entry', type: { name: 'Door Sensor' }, icon: true },
      { id: 6, name: '', icon: false },
      { id: 7, name: '', icon: false },
      { id: 8, name: 'Ceiling', type: { name: 'Fan Controller' }, icon: true },
      { id: 9, name: '', icon: false },
      { id: 10, name: '', icon: false },
      { id: 11, name: '', icon: false },
      { id: 12, name: '', icon: false },
      { id: 13, name: 'Camera', type: { name: 'Video Camera' }, icon: true },
      { id: 14, name: 'Music', type: { name: 'Media' }, icon: true },
      { id: 15, name: 'Media', type: { name: 'RGB Light' }, icon: true },
      { id: 16, name: 'Overhead', type: { name: 'RGB Light' }, icon: true },
    ];

    return (
      <View style={{flex: 1}}>
        <GridView
          items={items}
          itemsPerRow={4}
          renderItem={this.renderModule.bind(this)}>
        </GridView>

        {this.renderOverlay.bind(this)()}
      </View>
    )
  }


  renderModule(module, index) {
    return (
      <View style={styles.gridItem} key={index}>
        {this.renderIcon(module, index)}
        <Text style={styles.gridItemText}>{module.name}</Text>
      </View>
    )
  }


  renderIcon(module, index) {
    if(module.icon) {
      return (
        <TouchableHighlight
          key={module.id}
          onPress={this.iconPress.bind(this, module)}
          underlayColor='#5FE0DF'
          style={styles.gridItemIcon}>
          <View></View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          key={module.id}
          onLongPress={this.emptyLongPress.bind(this, index)}
          underlayColor='#FFFFFF'
          style={styles.gridItemBlank}>
          <View></View>
        </TouchableHighlight>
      )
    }
  }


  iconPress(module) {
    this.openOverlay.bind(this)(module);
  }


  emptyLongPress() {
  }


  renderOverlay() {
    if (this.state.activeItem) {
      return (
        <ModuleOverlay module={this.state.activeItem}
          onClose={this.onOverlayClose.bind(this)}/>
      )
    } else {
      return (
        <View />
      )
    }
  }


  openOverlay(module) {
    this.setState({
      ...this.state,
      activeItem: module
    })
  }


  onOverlayClose() {
    this.setState({
      ...this.state,
      activeItem: false
    })
  }
}


const iconDimension = 60;
const styles = StyleSheet.create({
  gridItem: {
    margin: 5,
    alignItems: 'center',
  },
  gridItemIcon: {
    width: iconDimension,
    height: iconDimension,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    shadowOpacity: 0.03,
    shadowColor: '#000000',
  },
  gridItemBlank: {
    width: iconDimension,
    height: iconDimension,
    backgroundColor: '#EFEFEF',
    borderRadius: 14
  },
  gridItemText: {
    marginTop: 5,
    width: iconDimension,
    height: 12,
    overflow: 'hidden',
    fontSize: 11,
    color: '#999999',
    textAlign: 'center'
  },
});


export default RoomModules;

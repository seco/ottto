import React, { Component } from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  View,
  Text
} from 'react-native';
import GridView from './grid-view';


class Room extends Component {
  render() {
    var items = [
      { id: 1, name: 'People', icon: true },
      { id: 2, name: 'Motion', icon: true },
      { id: 3, name: '', icon: false },
      { id: 4, name: 'Thermostat', icon: true },
      { id: 5, name: 'Entry', icon: true },
      { id: 6, name: '', icon: false },
      { id: 7, name: '', icon: false },
      { id: 8, name: 'Ceiling', icon: true },
      { id: 9, name: '', icon: false },
      { id: 10, name: '', icon: false },
      { id: 11, name: '', icon: false },
      { id: 12, name: '', icon: false },
      { id: 13, name: 'Camera', icon: true },
      { id: 14, name: 'Music', icon: true },
      { id: 15, name: 'Media', icon: true },
      { id: 16, name: 'Overhead', icon: true },
    ];

    return (
      <GridView
        items={items}
        itemsPerRow={4}
        renderItem={this.renderItem.bind(this)}>
      </GridView>
    )
  }


  renderItem(item, index) {
    return (
      <View style={styles.gridItem} key={index}>
        {this.renderIcon(item)}
        <Text style={styles.gridItemText}>{item.name}</Text>
      </View>
    )
  }


  renderIcon(item) {
    if(item.icon) {
      return (
        <TouchableHighlight
          key={item.id}
          onPress={this.iconPress.bind(this, item)}
          underlayColor='#5fe0df'
          style={styles.gridItemIcon}>
          <View></View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          key={item.id}
          onPress={this.emptyPress.bind(this, item)}
          underlayColor='#FFFFFF'
          style={styles.gridItemBlank}>
          <View></View>
        </TouchableHighlight>
      )
    }
  }


  iconPress(item) {
    console.log('icon', item);
  }


  emptyPress(item) {
    console.log('empty', item);
  }
}


const styles = StyleSheet.create({
  previewImage: {
    height: 100,
    backgroundColor: '#333333'
  },
  gridItem: {
    margin: 13,
    marginBottom: 0,
    alignItems: 'center'
  },
  gridItemIcon: {
    marginBottom: 5,
    width: 60,
    height: 60,
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    shadowOpacity: 0.03,
    shadowColor: '#000000',
  },
  gridItemBlank: {
    marginBottom: 5,
    width: 60,
    height: 60,
    backgroundColor: '#EFEFEF',
    borderRadius: 14
  },
  gridItemText: {
    maxWidth: 60,
    fontSize: 11,
    color: '#999999'
  }
});


export default Room;

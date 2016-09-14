import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  TouchableHighlight,
  View,
  Text
} from 'react-native';

class Room extends Component {
  constructor(props) {
    super(props);

    const items = [
      { id: 1, name: 1 },
      { id: 2, name: 2 },
      { id: 3, name: 3 },
      { id: 4, name: 4 },
      { id: 5, name: 5 },
      { id: 6, name: 6 },
      { id: 7, name: 7 },
      { id: 8, name: 8 },
      { id: 9, name: 9 },
      { id: 10, name: 10 },
      { id: 11, name: 11 },
      { id: 12, name: 12 },
      { id: 13, name: 13 },
      { id: 14, name: 14 },
      { id: 15, name: 15 },
      { id: 16, name: 16 },
    ]

    this.dataSource =
      new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

    this.state = {
      dataSource: this.dataSource.cloneWithRows(items)
    }
  }

  render() {
    return (
      <ListView contentContainerStyle={styles.container}
        dataSource={this.state.dataSource}
        renderRow={this._renderItem.bind(this)}>
      </ListView>
    )
  }

  _renderItem(item) {
    return (
      <TouchableHighlight
        onPress={this._itemPress.bind(this, item)}
        underlayColor='#FFFFFF'
        style={styles.gridItem}>
        <Text style={styles.gridText}>{item.name}</Text>
      </TouchableHighlight>
    )
  }

  _itemPress(item) {
    console.log(item);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 17,
    backgroundColor: '#FBFBFB',
  },
  gridItem: {
    margin: 10,
    width: 60,
    height: 60,
    backgroundColor: '#EFEFEF',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center'
  },
  gridText: {
    margin: 10
  }
});

export default Room;

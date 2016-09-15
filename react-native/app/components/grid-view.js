import React, { Component } from 'react';
import {
  StyleSheet,
  ListView,
  View
} from 'react-native';


class GridView extends Component {
  groupItems(items, itemsPerRow) {
    var groups = [];
    var group = [];

    items.forEach(function(item) {
      if (group.length === itemsPerRow) {
        groups.push(group);
        group = [item];
      } else {
        group.push(item);
      }
    });

    if (group.length > 0) {
      groups.push(group);
    }

    return groups;
  }


  render() {
    var groups = this.groupItems(this.props.items, this.props.itemsPerRow);

    var dataSource = new ListView.DataSource({
      rowHasChanged: (a, b) => a !== b
    });

    return (
      <ListView {...this.props}
        renderRow={this.renderGroup.bind(this)}
        dataSource={dataSource.cloneWithRows(groups)}
        contentContainerStyle={styles.container}>
      </ListView>
    )
  }


  renderGroup(group) {
    var items = group.map(this.props.renderItem);

    return (
      <View style={styles.row}>
        {items}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 13
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  }
});


export default GridView;

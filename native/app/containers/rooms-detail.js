import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import ModulesGrid from '../components/modules/grid';


class Room extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ModulesGrid modules={this.props.room.modules} />
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 85,
  }
});


export default Room;

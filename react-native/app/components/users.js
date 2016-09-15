import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

class Users extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>{'Users'}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  }
});

export default Users;

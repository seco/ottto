import React, { Component } from 'react';
import {
  StyleSheet,
  StatusBar,
  Navigator,
  View,
  Text
} from 'react-native';

class Rooms extends Component {
  render() {
    const scene = (route, navigator) => {
      return (
        <View style={styles.container}>
          <Text style={styles.welcome}>{route.title}</Text>
        </View>
      )
    }

    return (
      <Navigator
        initialRoute={{ title: 'Living Room', index: 0 }}
        navigationBar={this.navbar()}
        renderScene={scene}>
      </Navigator>
    )
  }

  navbar() {
    return (
      <Navigator.NavigationBar style={styles.header}
        routeMapper={{
          LeftButton: (route, navigator, index, navState) => {
            return;
          },
          RightButton: (route, navigator, index, navState) => {
            return (
              <Text style={styles.headerButton}>Edit</Text>
            );
          },
          Title: (route, navigator, index, navState) => {
            return (
              <Text style={styles.title}>{route.title}</Text>
            );
          }
        }}>
      </Navigator.NavigationBar>
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
  header: {
    backgroundColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 50,
    shadowOpacity: 0.5,
    shadowColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    padding: 10,
    fontSize: 18
  },
  headerButton: {
    padding: 10,
    fontSize: 18
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  }
});

export default Rooms;

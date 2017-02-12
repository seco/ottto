import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Slider,
} from 'react-native'


class MotionModule extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[
          styles.indicator,
          this.props.module.values.motion ? styles.active : styles.inactive
        ]}>
          <Text style={styles.text}>
            {this.props.module.values.motion ? 'Motion' : 'No Motion'}
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: 'center',
  },
  indicator: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
    borderRadius: 14,
  },
  active: {
    backgroundColor: '#007AFF',
  },
  inactive: {
    backgroundColor: '#ccc',
  },
  text: {
    color: "#FFF"
  }
})

export default MotionModule

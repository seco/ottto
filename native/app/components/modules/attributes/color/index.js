import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Slider,
} from 'react-native'


class Color extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.colorWheel}
          source={require('./colorwheel.png')}
          resizeMode='contain'
        />
      </View>
    )
  }

  onBrightnessChange(value) {
     this.setState({ brightness: value })
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  colorWheel: {
    width: 320,
    height: 320,
    borderRadius: 160,
  }
})

export default Color

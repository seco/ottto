import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Slider,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'


class LightModule extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.colorWheelContainer}>
          <Image style={styles.colorWheel}
            source={require('./colorwheel.png')}
            resizeMode='contain'
          />
        </View>
        <Slider
          onValueChange={this.onBrightnessChange.bind(this)}
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
  },
  colorWheelContainer: {
    alignItems: 'center',
    margin: 10,
  },
  colorWheel: {
    width: 320,
    height: 320,
    borderRadius: 160,
  }
})

export default LightModule

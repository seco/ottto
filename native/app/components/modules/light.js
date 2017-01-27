import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Slider,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Color from './attributes/color'


class LightModule extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Color attribute={this.props.module.attributes} />
        <Slider onValueChange={this.onBrightnessChange.bind(this)} />
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

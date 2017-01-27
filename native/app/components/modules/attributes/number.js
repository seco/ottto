import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  Image,
  Slider,
} from 'react-native'


class Number extends Component {
  render() {
    const { value, attribute } = this.props

    console.log(value, attribute, this.props)

    return (
      <Slider value={this.props.value}
        minimumValue={this.props.attribute.min}
        maximumValue={this.props.attribute.max}
        step={this.props.attribute.step}
        onValueChange={this.onValueChange.bind(this)} />
    )
  }

  onValueChange(value) {
     console.log('value', value)
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

export default Number

import _ from 'lodash'

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

    return (
      <Slider value={parseInt(this.props.value, 10)}
        minimumValue={attribute.min}
        maximumValue={attribute.max}
        step={attribute.step}
        onValueChange={_.throttle(this.onValueChange.bind(this), 200, { leading: false })} />
    )
  }

  onValueChange(value) {
    console.log('value', value)
    this.props.onValueChange && this.props.onValueChange(value)
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

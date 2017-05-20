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
  constructor(props) {
    super(props)

    this.onValueChange =
      _.throttle(props.onValueChange.bind(this), 200, { leading: false })
  }

  render() {
    const { value, attribute } = this.props

    return (
      <Slider value={parseInt(this.props.value, 10)}
        minimumValue={attribute.min}
        maximumValue={attribute.max}
        step={attribute.step}
        onValueChange={this.onValueChange.bind(this)} />
    )
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

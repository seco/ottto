import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Color from './attributes/color'
import Number from './attributes/number'


class Light extends Component {
  render() {
    const color =
      this.props.module.type.attributes.find((attribute) => {
        return attribute.name == 'color'
      })

    const level =
      this.props.module.type.attributes.find((attribute) => {
        return attribute.name == 'level'
      })

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Color</Text>
        <Color
          value={this.props.module.values.color}
          attribute={color}
          onColorChange={this.onColorChange.bind(this)}/>
        <Text style={styles.label}>Level</Text>
        <Number
          value={this.props.module.values.level}
          attribute={level} />
      </View>
    )
  }

  onColorChange(color) {
    console.log('light', color)
  }
}

const styles = StyleSheet.create({
  container: {
  },
  label: {
    color: '#CCC',
  }
})

export default Light

import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateModule } from '../../../actions/modules'

import { StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Color from '../attributes/color'
import Number from '../attributes/number'
import Boolean from '../attributes/boolean'


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

    const power =
      this.props.module.type.attributes.find((attribute) => {
        return attribute.name == 'power'
      })

    return (
      <View style={styles.container}>
        <Text style={styles.label}>Color</Text>
        <Color
          value={this.props.module.values.color}
          attribute={color}
          onValueChange={this.onColorChange.bind(this)} />
        <Text style={styles.label}>Level</Text>
        <Number
          value={this.props.module.values.level}
          attribute={level}
          onValueChange={this.onLevelChange.bind(this)}/>
        <Text style={styles.label}>Power</Text>
        <Boolean
          value={this.props.module.values.power}
          attribute={power}
          onValueChange={this.onPowerChange.bind(this)} />
      </View>
    )
  }

  onColorChange(color) {
    this.onValueChange('color', color)
  }

  onLevelChange(level) {
    this.onValueChange('level', level)
  }

  onPowerChange(power) {
    this.onValueChange('power', power)
  }

  onValueChange(name, value) {
    let module = _.clone(this.props.module)
    module.values[name] = value

    this.props.onModuleChange(module)
  }
}

const styles = StyleSheet.create({
  container: {
  },
  label: {
    color: '#CCC',
  }
})


export default connect(
  (state) => ({ }),
  (dispatch) => bindActionCreators({ updateModule }, dispatch)
)(Light)

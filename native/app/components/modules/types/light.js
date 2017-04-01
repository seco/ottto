import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { updateModule } from '../../../actions/modules'

import {
  StyleSheet,
  Text,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Color from '../attributes/color'
import Number from '../attributes/number'


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
          onValueChange={_.throttle(this.onColorChange.bind(this), 200)} />
        <Text style={styles.label}>Level</Text>
        <Number
          value={parseInt(this.props.module.values.level, 10)}
          attribute={level}
          onValueChange={_.throttle(this.onLevelChange.bind(this), 200)}/>
      </View>
    )
  }

  onColorChange(color) {
    let module = _.clone(this.props.module)
    module.values.color = color

    this.props.onModuleChange(module)
  }

  onLevelChange(number) {
    let module = _.clone(this.props.module)
    module.values.level = number

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

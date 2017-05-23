import React, { Component } from 'react'
import { StyleSheet, View, Text, Switch } from 'react-native'


class Boolean extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: props.value
    }
  }

  render() {
    const { attribute } = this.props

    const truthy = attribute.options[0]
    const falsey = attribute.options[1]

    return (
      <View>
        <Switch value={this.state.value}
          onValueChange={this.onValueChange.bind(this)} />
      </View>
    )
  }

  onValueChange(value) {
    this.setState({ value: value })
    this.props.onValueChange(value)
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

export default Boolean

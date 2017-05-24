import _ from 'lodash'

import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Animated,
} from 'react-native'
import tinycolor from 'tinycolor2'


const WHEEL_RADIUS = 130
const CURSOR_RADIUS = 20


class Color extends Component {
  constructor(props) {
    super(props)

    this.state = this.calculateState(props)

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: this.onMove.bind(this),
      onPanResponderMove: this.onMove.bind(this),
      onPanResponderRelease: this.onMoveEnd.bind(this),
    })

    this.onValueChange =
      _.throttle(props.onValueChange.bind(this), 100, { leading: false })
  }

  componentWillReceiveProps(props) {
    this.setState(this.calculateState(props))
  }

  calculateState(props) {
    let color = tinycolor(props.value || '#FFF').toHsl()
    let hue = color.h
    let lightness = color.l

    let angle = hue
    let distance = Math.min((1 - lightness) * (2 * WHEEL_RADIUS), WHEEL_RADIUS)
    let { x, y } = this.getCoordinates(angle, distance)
    let left = WHEEL_RADIUS + x
    let top = WHEEL_RADIUS - y

    return {
      left: left,
      top: top,
      cursorLeft: left - CURSOR_RADIUS,
      cursorTop: top - CURSOR_RADIUS,
      color: props.value,
    }
  }

  getCoordinates(angle, distance) {
    return {
      x: Math.round(Math.cos(angle * Math.PI / 180) * distance),
      y: Math.round(Math.sin(angle * Math.PI / 180) * distance),
    }
  }

  onMove(event, gesture) {
    let preLeft = event.nativeEvent.locationX
    let preTop = event.nativeEvent.locationY
    let preX = preLeft - WHEEL_RADIUS
    let preY = preTop - WHEEL_RADIUS

    let angle = this.getAngle(preX, preY)
    let distance = Math.min(this.getDistance(preX, preY), WHEEL_RADIUS)
    let { x, y } = this.getCoordinates(angle, distance)
    let left = WHEEL_RADIUS + x
    let top = WHEEL_RADIUS - y

    let hue = angle
    let saturation = 100
    let lightness = 1 - (distance / (2 * WHEEL_RADIUS))
    let color = tinycolor({ h: hue, s: saturation, l: lightness }).toHexString()

    this.setState({
      cursorLeft: left - CURSOR_RADIUS,
      cursorTop: top - CURSOR_RADIUS,
      color
    })

    this.onValueChange(color)
  }

  getAngle(x, y) {
    return (-Math.atan2(y, x) * (180 / Math.PI) + 360) % 360
  }

  getDistance(x, y) {
    return Math.sqrt(x * x + y * y)
  }

  onMoveEnd(event, gesture) {
    this.setState({
      left: this.state.left + gesture.dx,
      top: this.state.top + gesture.dy,
    })
  }

  render() {
    return (
      <View style={[styles.container, this.getWheelStyles()]}
        {...this.panResponder.panHandlers}>
        <Image style={styles.colorWheel}
          source={require('./colorwheel.png')}
          resizeMode='contain' />
        <View style={styles.cursorContainer}
          pointerEvents="none">
          <Animated.View style={[styles.cursor, this.getCursorStyles()]} />
        </View>
      </View>
    )
  }

  getCursorStyles() {
    return {
      left: this.state.cursorLeft,
      top: this.state.cursorTop,
      backgroundColor: this.state.color,
    }
  }

  getWheelStyles() {
    return {
      borderColor: this.state.color,
    }
  }
}


const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: WHEEL_RADIUS * 2 + 40,
    height: WHEEL_RADIUS * 2 + 40,
    borderWidth: 20,
    borderColor: '#FFF',
    borderRadius: WHEEL_RADIUS * 2 + 40,
  },
  colorWheel: {
    width: WHEEL_RADIUS * 2,
    height: WHEEL_RADIUS * 2,
    borderRadius: WHEEL_RADIUS,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowColor: '#000000',
  },
  cursorContainer: {
    position: 'absolute',
  },
  cursor: {
    width: CURSOR_RADIUS * 2,
    height: CURSOR_RADIUS * 2,
    backgroundColor: 'hsl(0, 100%, 50%)',
    borderWidth: 4,
    borderColor: '#FFF',
    borderRadius: CURSOR_RADIUS,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowColor: '#000000',
  },
})

export default Color

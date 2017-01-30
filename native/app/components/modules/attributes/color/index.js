import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Image,
  PanResponder,
  Animated,
} from 'react-native'


const WHEEL_RADIUS = 160
const CURSOR_RADIUS = 20


class Color extends Component {
  constructor(props) {
    super(props)

    let left = WHEEL_RADIUS - CURSOR_RADIUS
    let top = WHEEL_RADIUS - CURSOR_RADIUS

    this.state = {
      previousLeft: left,
      previousTop: top,
      left,
      top,

      hue: 0,
      saturation: 0,
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder : () => true,
      onPanResponderMove: this.onMove.bind(this),
      onPanResponderRelease: this.onMoveEnd.bind(this),
    })
  }

  onMove(event, gesture) {
    let left = this.state.previousLeft + gesture.dx
    let top = this.state.previousTop + gesture.dy
    let center = WHEEL_RADIUS - CURSOR_RADIUS
    let x = left - center
    let y = top - center

    let rad = Math.atan2(y, x)
    let length = Math.sqrt(x * x + y * y)

    let hue = (-rad * (180 / Math.PI) + 360) % 360
    let lightness = (1 - length / WHEEL_RADIUS) * 50 + 50

    let color = `hsl(${hue}, 100%, ${lightness}%)`

    this.setState({ left, top, color })
  }

  onMoveEnd(event, gesture) {
    this.setState({
      previousLeft: this.state.previousLeft + gesture.dx,
      previousTop: this.state.previousTop + gesture.dy,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.colorWheel}
          source={require('./colorwheel.png')}
          resizeMode='contain'
        />
        <View style={styles.cursorContainer}>
          <Animated.View style={[styles.cursor, this.getCursorStyles()]}
            {...this.panResponder.panHandlers} />
        </View>
      </View>
    )
  }

  getCursorStyles() {
    return {
      left: this.state.left,
      top: this.state.top,
      backgroundColor: this.state.color
    }
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: 10,
  },
  colorWheel: {
    width: WHEEL_RADIUS * 2,
    height: WHEEL_RADIUS * 2,
    borderRadius: WHEEL_RADIUS,
  },
  cursorContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
  },
  cursor: {
    width: CURSOR_RADIUS * 2,
    height: CURSOR_RADIUS * 2,
    backgroundColor: 'hsl(0, 100%, 50%)',
    borderWidth: 4,
    borderColor: '#FFF',
    borderRadius: CURSOR_RADIUS,
    // shadowOffset: { width: 0, height: 3 },
    // shadowRadius: 10,
    // shadowOpacity: 0.03,
    // shadowColor: '#000000',
  },
})

export default Color

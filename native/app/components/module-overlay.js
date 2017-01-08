import React, { Component } from 'react'
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { BlurView, VibrancyView } from 'react-native-blur'
import LightModule from './modules/light'

const AnimatedBlurView = Animated.createAnimatedComponent(VibrancyView)


class ModuleOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      containerBottom: new Animated.Value(-50),
      containerOpacity: new Animated.Value(0),
    }
  }


  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.containerBottom,
        { toValue: 0, duration: 300 }
      ),
      Animated.timing(
        this.state.containerOpacity,
        { toValue: 1, duration: 300 }
      )
    ]).start()
  }


  render() {
    return (
      <Modal
        visible={true}
        transparent={true}>
        <AnimatedBlurView style={[
            styles.blur,
          ]}
          blurType="dark">
        </AnimatedBlurView>
        <Animated.View
          style={[
            styles.modalContainer,
            {
              bottom: this.state.containerBottom,
              opacity: this.state.containerOpacity
            }
          ]}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{this.props.module.name}</Text>
              <Text style={styles.modalSubtitle}>{this.props.module.type.name}</Text>
            </View>

            <View style={styles.modalBody}>
              <LightModule module={this.props.module}/>
            </View>
          </View>

          <TouchableHighlight style={styles.modalClose}
            onPress={this.close.bind(this)}
            underlayColor='#007AFF'>
            <Text>Close</Text>
          </TouchableHighlight>
        </Animated.View>
      </Modal>
    )
  }


  close() {
    Animated
      .parallel([
        Animated.timing(
          this.state.containerBottom,
          { toValue: -50, duration: 300 },
        ),
        Animated.timing(
          this.state.containerOpacity,
          { toValue: 0, duration: 300 },
        )
      ])
      .start(this.onClose.bind(this))
  }


  onClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}


const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    padding: 10,
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  modalHeader: {
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  modalTitle: {
    fontWeight: '600',
  },
  modalBody: {
    padding: 10,
    // flex: 1,
    // backgroundColor: '#f00',
  },
  modalClose: {
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
})

export default ModuleOverlay

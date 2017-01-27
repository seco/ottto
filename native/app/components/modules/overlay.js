import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { VibrancyView } from 'react-native-blur'
import LightModule from './light'
import MotionModule from './motion'

const AnimatedVibrancyView = Animated.createAnimatedComponent(VibrancyView)


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
        <AnimatedVibrancyView style={styles.blur}/>
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
              {this.renderModule(this.props.module)}
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


  renderModule(module) {
    switch (this.props.module.type.id) {
      case 1: return (<LightModule module={module} />)
      case 2: return (<MotionModule module={module} />)
    }
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
    backgroundColor: '#000',
    opacity: 0.5
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
  },
  modalClose: {
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
})


export default connect(
  (state) => ({ module: state.modules.active }),
  (dispatch) => ({ })
)(ModuleOverlay)

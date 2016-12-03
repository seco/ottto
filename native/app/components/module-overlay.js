import React, { Component } from 'react';
import {
  Animated,
  Modal,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';


class ModuleOverlay extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundOpacity: new Animated.Value(0),
      containerBottom: new Animated.Value(-50),
      containerOpacity: new Animated.Value(0),
    };
  }


  componentDidMount() {
    Animated.parallel([
      Animated.timing(
        this.state.backgroundOpacity,
        { toValue: 0.5, duration: 300 }
      ),
      Animated.timing(
        this.state.containerBottom,
        { toValue: 0, duration: 300 }
      ),
      Animated.timing(
        this.state.containerOpacity,
        { toValue: 1, duration: 300 }
      )
    ]).start();
  }


  render() {
    return (
      <Modal
        visible={true}
        transparent={true}>
        <Animated.View
          style={[
            styles.modalBackground,
            { opacity: this.state.backgroundOpacity }
          ]} />

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
              <Text>{this.props.module.name}</Text>
              <Text>{this.props.module.type.name}</Text>
            </View>
          </View>

          <TouchableHighlight style={styles.modalClose}
            onPress={this.close.bind(this)}
            underlayColor='#5fe0df'>
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
          this.state.backgroundOpacity,
          { toValue: 0, duration: 300 }
        ),
        Animated.timing(
          this.state.containerBottom,
          { toValue: -50, duration: 300 }
        ),
        Animated.timing(
          this.state.containerOpacity,
          { toValue: 0, duration: 300 }
        )
      ])
      .start(this.onClose.bind(this));
  }


  onClose() {
    if (this.props.onClose) {
      this.props.onClose()
    }
  }
}


const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    position: 'absolute',
    left: 0, right: 0, bottom: 0,
    padding: 10,
  },
  modalContent: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  modalClose: {
    alignItems: 'center',
    marginTop: 10,
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
});

export default ModuleOverlay;

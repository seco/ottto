import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Actions } from 'react-native-router-flux'
import Modal from 'react-native-modalbox'

class RoomsAdd extends Component {
  componentDidMount() {
    this.refs.modal.open()
  }

  close() {
    this.refs.modal.close()
  }

  onClose() {
    Actions.pop()
  }

  render() {
    return (
      <Modal ref="modal"
        position="center"
        onClosed={this.onClose}
        style={styles.modal}>
        <Text onPress={this.close}>Add Room</Text>
      </Modal>
    )
  }
}


const styles = StyleSheet.create({
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 300,
    width: 300,
  }
})


export default RoomsAdd

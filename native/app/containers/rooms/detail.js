import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { StyleSheet, View } from 'react-native'
import ModulesGrid from '../../components/modules/grid'
import ModulesOverlay from '../../components/modules/overlay'


class Room extends Component {
  constructor(props) {
    super(props)

    this.state = {
      active: null
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <ModulesGrid modules={this.props.modules}
          onModulePress={this.onModulePress.bind(this) }/>
        <ModulesOverlay module={this.state.active}
          onClose={this.onOverlayClose.bind(this)} />
      </View>
    )
  }

  onModulePress(module) {
    this.setState({ active: module })
  }

  onOverlayClose() {
    this.setState({ active: null })
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 85,
  }
})


export default connect(
  (state, props) => {
    return {
      modules: _.filter(state.modules.entities, (module) => {
        return module.group ? module.group.id == props.room.id : false
      })
    }
  },
  (dispatch) => ({})
)(Room)

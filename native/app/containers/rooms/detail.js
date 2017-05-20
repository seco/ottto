import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { StyleSheet, View } from 'react-native'
import ModulesGrid from '../../components/modules/grid'
import ModulesOverlay from '../../components/modules/overlay'


class Room extends Component {
  render() {
    return (
      <View style={styles.container}>
        <ModulesGrid modules={this.props.modules} />

        {this.renderOverlay.bind(this)()}
      </View>
    )
  }

  renderOverlay() {
    console.log('renderOverlay', this.props.active);

    if(this.props.active) {
      return (
        <ModulesOverlay module={this.props.active} />
      )
    } else {
      return (
        <View />
      )
    }
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
      }),
      active: state.modules.entities[state.modules.active]
    }
  },
  (dispatch) => ({})
)(Room)

import _ from 'lodash'

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getModule } from '../../actions/modules'

import {
  ListView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native'
import { BlurView } from 'react-native-blur'
import GridView from '../grid-view'
import ModuleOverlay from './overlay'


class ModulesGrid extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeItem: false
    }
  }


  render() {
    const count = 24
    const modules = this.props.modules.map((module) => {
      return {
        ...module,
        icon: true
      }
    })
    const blank = { name: '', icon: false }
    const blanks = _.fill(Array(count - modules.length), blank)
    const items = _.concat(modules, blanks)

    return (
      <View style={{flex: 1}}>
        <GridView
          items={items}
          itemsPerRow={4}
          renderItem={this.renderModule.bind(this)}>
        </GridView>

        {this.renderOverlay.bind(this)()}
      </View>
    )
  }


  renderModule(module, index) {
    return (
      <View style={styles.gridItem} key={index}>
        {this.renderIcon(module, index)}
        <Text style={styles.gridItemText}>{module.name}</Text>
      </View>
    )
  }


  renderIcon(module, index) {
    if(module.icon) {
      return (
        <TouchableHighlight
          key={module.id}
          onPress={this.iconPress.bind(this, module)}
          underlayColor='#FFFFFF'
          style={styles.gridItemIcon}>
          <View></View>
        </TouchableHighlight>
      )
    } else {
      return (
        <TouchableHighlight
          key={module.id}
          onLongPress={this.emptyLongPress.bind(this, index)}
          underlayColor='#FFFFFF'
          style={styles.gridItemBlank}>
          <View></View>
        </TouchableHighlight>
      )
    }
  }


  iconPress(module) {
    this.openOverlay.bind(this)(module)
  }


  emptyLongPress() {
    console.log('show "add module" menu')
  }


  renderOverlay() {
    if (this.state.activeItem) {
      return (
        <ModuleOverlay module={this.state.activeItem}
          onClose={this.onOverlayClose.bind(this)}/>
      )
    } else {
      return (
        <View />
      )
    }
  }


  openOverlay(module) {
    this.props.getModule(module.id)
      .then((()=> {
        this.setState({
          ...this.state,
          activeItem: module
        })
      }).bind(this))
  }


  onOverlayClose() {
    this.setState({
      ...this.state,
      activeItem: false
    })
  }
}


const iconDimension = 60;
const styles = StyleSheet.create({
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: 'transparent',
  },
  gridItem: {
    margin: 5,
    alignItems: 'center',
  },
  gridItemIcon: {
    width: iconDimension,
    height: iconDimension,
    backgroundColor: '#007AFF',
    borderRadius: 14,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 10,
    shadowOpacity: 0.03,
    shadowColor: '#000000',
  },
  gridItemBlank: {
    width: iconDimension,
    height: iconDimension,
    backgroundColor: '#EFEFEF',
    borderRadius: 14
  },
  gridItemText: {
    marginTop: 5,
    width: iconDimension,
    height: 12,
    overflow: 'hidden',
    fontSize: 11,
    color: '#999999',
    textAlign: 'center'
  },
})


export default connect(
  (state) => ({ }),
  (dispatch) => ( bindActionCreators({ getModule }, dispatch) )
)(ModulesGrid)

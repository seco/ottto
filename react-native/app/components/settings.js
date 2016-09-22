import React, { Component } from 'react';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as counterActions from '../actions/counter';


class Settings extends Component {
  constructor(props) {
    super(props);

    console.log('constructor', this.props);
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.props.increment}>
          <Text>{this.props.count}</Text>
        </TouchableHighlight>
      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FBFBFB',
  },
  welcome: {
    fontSize: 36,
    textAlign: 'center',
    margin: 10,
  }
});


export default connect(
  (state) => ({ count: state.counter.count }),
  (dispatch) => ( bindActionCreators(counterActions, dispatch) )
)(Settings);

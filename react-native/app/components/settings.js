import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  View } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { actions as countActions } from '../actions/count';


class Settings extends Component {
  constructor(props) {
    super(props);
  }


  increment() {
    this.props.increment(Math.round(Math.random()*10));
  }


  decrement() {
    this.props.decrement();
  }


  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          onPress={this.increment.bind(this)}
          underlayColor='#FFF'>
          <Text style={styles.welcome}>{this.props.count}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          onPress={this.decrement.bind(this)}
          underlayColor='#FFF'>
          <Text style={styles.welcome}>{this.props.count}</Text>
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
  (state) => ({ count: state.count }),
  (dispatch) => ( bindActionCreators(countActions, dispatch) )
)(Settings);

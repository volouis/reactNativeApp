/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

type Props = {};
export default class App extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={[styles.welcome, {flex: 5}]}>Welsdscome</Text>
        <Text style={[styles.welcome, {flex: 3}]}>Welsdscome</Text>
        <Text style={[styles.welcome, {flex: 1}]}>Welsdscome</Text>
        <Text style={[styles.welcome, {flex: 1}]}>Welsdscome</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: 'black',
  },
  welcome: {
    fontSize: 20,
    // // textAlign: 'center',
    margin: 10,
    backgroundColor: 'orange',
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

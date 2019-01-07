import React from 'react';

import {Platform, StyleSheet, Text, View} from 'react-native';

class App extends React.Component {
  render(){
    return (
      <View style={style.container}>
        <Text>TargetSum</Text>
      </View>
    );
  }
}

const style = StyleSheet.create({
  container:{
    backgroundColor: '#ddd',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default App;
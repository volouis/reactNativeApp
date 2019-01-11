import React from 'react';

import {StyleSheet, Text, TouchableOpacity} from 'react-native';

class RandomNumber extends React.Component {

  handlePress = () => {
    if(this.props.isDisable) {return;}
    this.props.onPress(this.props.id);
  }


  render() {
    return(
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={[style.num, this.props.isDisable && style.disable]}>
          {this.props.number}
        </Text>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create ({
  num: {
    backgroundColor: 'yellow',
    textAlign: 'center',
    fontSize: 100,
    width: 150,
    margin: 10
  },
  disable: {
    opacity: 0.3,
  }
});

export default RandomNumber;
import React from 'react';

import {StyleSheet, Text, View} from 'react-native';

import RandomNumber from './RandomNumber';

class Game extends React.Component {

  state = {
    selectedNumber: [],
  }

  randomNumber = Array
    .from({ length: this.props.randomNumberCount}) 
    .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumber
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);
  
  isNumberSelected = (numIndex) => {
    return this.state.selectedNumber.indexOf(numIndex) >= 0;
  };

  selectNumber = (numIndex) => {
    this.setState((prevState) => ({ 
      selectedNumber: [...prevState.selectedNumber, numIndex],
    }));
  };

  gameStatus = () => {
    const sumSelected = this.state.selectedNumber.reduce((acc, curr) => {
      return acc + this.randomNumber[curr];
    }, 0);

    if(sumSelected < this.target){
      return 'Play'; 
    }
    if(sumSelected === this.target){
      return 'Win';
    }
    if(sumSelected > this.target){
      return 'Lose';
    }
  }

  render(){
    const gameStatus = this.gameStatus();
    return (
      <View style={style.container}>
        <Text style={[style.target, style[`Status_${gameStatus}`]]}>Target: {this.target}</Text>
  
        <View style={style.numberContent}>
          {this.randomNumber.map((rand, index) => {
            return(
              <RandomNumber 
                key={index} 
                id={index}
                number={rand} 
                isDisable={this.isNumberSelected(index) || gameStatus !== 'Play'}
                onPress={this.selectNumber}
              />
            );
          })}
        </View>
        <Text>{gameStatus}</Text>
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
  },

  target:{
    fontSize: 50,
    margin: 50
  },

  numberContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },

  num: {
    backgroundColor: 'yellow',
    textAlign: 'center',
    fontSize: 100,
    width: 150,
    margin: 10
  },

  Status_Play: {
    backgroundColor: '#bbb',
  },

  Status_Win: {
    backgroundColor: 'green',
  },

  Status_Lose: {
    backgroundColor: 'red',
  }
});

export default Game;
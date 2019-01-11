import React from 'react';

import {StyleSheet, Button, Text, View} from 'react-native';

import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {

  state = {
    selectedNumber: [],
    remainingSeconds: this.props.initialSeconds,
    wins: 0,
    lost: 0
  }
  gameStatus = 'Play'
  randomNumber = Array
    .from({ length: this.props.randomNumberCount}) 
    .map(() => 1 + Math.floor(10 * Math.random()));

  target = this.randomNumber
    .slice(0, this.props.randomNumberCount - 2)
    .reduce((acc, curr) => acc + curr, 0);

  shuffleRandomNumber = shuffle(this.randomNumber);
  
  componentDidMount(){
    this.intervalId = setInterval(() => {
      this.setState((prevState) => {
        return { remainingSeconds: prevState.remainingSeconds - 1 };
      }, () => {
        if (this.state.remainingSeconds === 0) {
          clearInterval(this.intervalId);
        }
      });
    }, 1000);
  }

  componentWillUnmount(){
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numIndex) => {
    return this.state.selectedNumber.indexOf(numIndex) >= 0;
  };

  selectNumber = (numIndex) => {
    this.setState((prevState) => ({ 
      selectedNumber: [...prevState.selectedNumber, numIndex],
    }));
  };

  componentWillUpdate(nextProps, nextState) {
    if(nextState.selectedNumber !== this.state.selectedNumber || nextState.remainingSeconds === 0){
      this.gameStatus = this.calGameStatus(nextState);
      if(this.gameStatus !== 'Play'){
        clearInterval(this.intervalId);
      }
    }
  }

  calGameStatus = (nextState) => {
    const sumSelected = nextState.selectedNumber.reduce((acc, curr) => {
      return acc + this.shuffleRandomNumber[curr];
    }, 0);
    
    if(nextState.remainingSeconds === 0){
      return 'Lose';
    }
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
    const gameStatus = this.gameStatus;
    return (
      <View style={style.container}>
        <Text style={[style.target, style[`Status_${gameStatus}`]]}>Target: {this.target}</Text>
        <Text style={style.countDowm}>Time: {this.state.remainingSeconds}</Text>
        {this.gameStatus !== 'Play' && (
          <Button title='Play Again' onPress={this.props.onPlayAgain} style={style.reBtn}/>
        )}

        <View style={style.numberContent}>
          {this.shuffleRandomNumber.map((rand, index) => {
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
        {/* <Text style={style.score}>Wins:{this.state.wins}    Lost:{this.state.lost}</Text> */}
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
    marginTop: 50
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
  },

  countDowm: {
    fontSize: 30,
  },

  score: {
    fontSize: 30,
    marginBottom: 30,
  }
});

export default Game;
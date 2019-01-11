import React from 'react';

import Game from './Game';

class App extends React.Component {
  state = {
    gameId: 1,
    intense: 8,
    score: [0, 0]
  }

  resetGame = () => {
    this.setState((prevState) => {
      return { gameId: prevState.gameId + 1};
    });
  }

  render(){
    return (
      <Game 
        key={this.state.gameId} 
        onPlayAgain={this.resetGame}
        randomNumberCount={this.state.intense} 
        initialSeconds={10}
      />
    );
  }
}

export default App;
import React, { Component } from 'react';
import DirectionButton from './components/directionButton.js';
import WorldInteraction from "./components/WorldInteraction";
import GameMapStatus from "./components/GameMapStatus";

class App extends Component {
  

  render() {
    
    return (
      <div className="App">
        <DirectionButton direction="North" />
        <DirectionButton direction="South" />
        <DirectionButton direction="East" />
        <DirectionButton direction="West" />
        <WorldInteraction />
        <GameMapStatus />
      </div>
    );
  }
}

export default App;

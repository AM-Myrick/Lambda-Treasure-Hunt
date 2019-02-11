import React, { Component } from 'react';
import DirectionButton from './components/directionButton.js';
import TreasureInteraction from "./components/TreasureInteraction";
import GameMapStatus from "./components/GameMapStatus";

class App extends Component {
  

  render() {
    
    return (
      <div className="App">
        <DirectionButton direction="North" />
        <DirectionButton direction="South" />
        <DirectionButton direction="East" />
        <DirectionButton direction="West" />
        <TreasureInteraction />
        <GameMapStatus />
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import DirectionButton from './components/directionButton.js';
import TreasureInteraction from "./components/TreasureInteraction"

class App extends Component {

  componentDidMount() {
  }
  

  render() {
    
    return (
      <div className="App">
        <DirectionButton direction="North" />
        <DirectionButton direction="South" />
        <DirectionButton direction="East" />
        <DirectionButton direction="West" />
        <TreasureInteraction />
      </div>
    );
  }
}

export default App;

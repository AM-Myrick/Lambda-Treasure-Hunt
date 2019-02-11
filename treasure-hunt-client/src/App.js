import React, { Component } from 'react';
import DirectionButton from './components/directionButton.js';

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
      </div>
    );
  }
}

export default App;

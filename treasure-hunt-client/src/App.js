import React, { Component } from 'react';
import axios from "axios";
import DirectionButton from './components/directionButton.js';
import TreasureInteraction from "./components/TreasureInteraction"

const token = process.env.REACT_APP_TOKEN;
const URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/"
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
}

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      title: "",
      cooldown: "",
      description: "",
      exits: "",
      items: "",
    }
  }

  componentDidMount() {
    axios.get(URL, {headers: headers})
      .then((res) => {
        this.setState({ ...this.state,
        title: res.data.title,
        cooldown: res.data.cooldown,
        description: res.data.description,
        exits: res.data.exits,
        items: res.data.items})
      })
  }
  

  render() {
    
    return (
      <div className="App">
        <DirectionButton direction="North" />
        <DirectionButton direction="South" />
        <DirectionButton direction="East" />
        <DirectionButton direction="West" />
        <TreasureInteraction />
        <p>{this.state.title}</p>
        <p>{this.state.cooldown}</p>
        <p>{this.state.description}</p>
        <p>{this.state.exits}</p>
        <p>{this.state.items}</p>
      </div>
    );
  }
}

export default App;

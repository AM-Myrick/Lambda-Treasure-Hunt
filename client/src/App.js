import React, { Component } from 'react';
import axios from "axios";
import DirectionButton from "./components/DirectionButton.js";
const token = process.env.REACT_APP_TOKEN;
const baseURL = `https://lambda-treasure-hunt.herokuapp.com/api/adv`;
// const curRoomURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/"
// const moveURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/fly/"
// const dropURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/"
// const getURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/take/"
// const shrineURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/"
// const sellURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/"

const headers = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${token}`
}

// let graph = {};
// let lastRoomID;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      room_id: "",
      title: "",
      description: "",
      coordinates: "",
      cooldown: "",
      elevation: "",
      exits: "",
      items: "",
      messages: "",
      players: "",
      terrain: ""
    }
    
  }

  componentDidMount() {
    this.fetchRoom();
  }
  

  wait = ms => new Promise((r, j)=>setTimeout(r, ms))

  fetchRoom = () => {
    axios
      .get(`${baseURL}/init`, {headers: headers})
      .then(res => {
        const {room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain} = res.data;
        this.setState({ ...this.state, room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain});
      })
      .catch(error => {
        console.log(error);
      })
  }

  changeRoom = (dir, next=undefined) => {
    axios
      .post(`${baseURL}/fly`, {"direction": dir, "next_room_id": next}, {headers: headers})
      .then(res => {
        const {room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain} = res.data;
        this.setState({ ...this.state, room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain});
      })
      .catch(error => {
        console.log(error);
      })
  }
  
  render() {
    return (
      <div className="App">
        <DirectionButton direction="North" changeRoom={this.changeRoom}/>
        <DirectionButton direction="South" changeRoom={this.changeRoom}/>
        <DirectionButton direction="East" changeRoom={this.changeRoom}/>
        <DirectionButton direction="West" changeRoom={this.changeRoom}/>
        <p>Current Room # is {this.state.room_id}</p>
        <p>Room Title: {this.state.title}</p>
        <p>Room Coordinates: {this.state.coordinates}</p>
        <p>Cooldown: {this.state.cooldown}</p>
        <p>Room Description: {this.state.description}</p>
        <p>Exits: {this.state.exits}</p>
        <p>Items: {this.state.items}</p>
      </div>
    );
  }
}

export default App;

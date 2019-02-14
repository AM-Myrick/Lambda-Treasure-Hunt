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

let graph = {};
let lastRoomID;
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
        console.log(res.data);
        // populateGraph(res.data.room_id, res.data.exits)
        // console.log(graph)
      })
      .catch(error => {
        console.log(error);
      })
  }

  changeRoom = (dir, next=undefined) => {
    axios
      .post(`${baseURL}/fly`, {"direction": dir, "next_room_id": next}, {headers: headers})
      .then(res => {
        console.log(res.data);
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
      </div>
    );
  }
}

export default App;

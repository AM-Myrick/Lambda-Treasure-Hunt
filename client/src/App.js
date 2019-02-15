import React, { Component } from 'react';
import axios from "axios";
import DirectionButton from "./components/DirectionButton.js";
import Map from "./components/Map.js";
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
let coordinates = {};
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
      terrain: "",
    }
    this.automatedTraversal = this.automatedTraversal.bind(this);
  }

  componentDidMount() {
    this.fetchRoom();
  }

  fetchRoom = () => {
    axios
      .get(`${baseURL}/init`, {headers: headers})
      .then(res => {
        const {room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain} = res.data;
        this.setState({ ...this.state, room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain});
        this.populateGraph(room_id, exits);
        this.populateCoordinates(room_id, coordinates);
        console.log(this.state.room_id);
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
        this.populateGraph(room_id, exits);
        this.populateCoordinates(room_id, coordinates);
        this.updateGraph(this.state.room_id, room_id, dir);
        this.setState({ ...this.state, room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain});
        
        console.log("changing", Math.floor(Date.now() / 1000))
      })
      .catch(error => {
        console.log(error);
      })
  }

  populateGraph = (curID, exits) => {
    if (Object.keys(JSON.parse(localStorage.getItem("map"))).length > 0) {
      graph = JSON.parse(localStorage.getItem("map"));
    } 
    
    if (graph.hasOwnProperty(curID) === false) {
        graph[curID] = {};
        for (let e of exits) {
            graph[curID][e] = "?";
        }
        localStorage.setItem("map", JSON.stringify(graph));
    }
  }

  populateCoordinates = (id, c) => {
    if (localStorage.getItem("coords")) {
      coordinates = JSON.parse(localStorage.getItem("coords"));
    } 

    if (coordinates.hasOwnProperty(id) === false) {
      coordinates[id] = c.replace(/["()]/gi, '').split(",")
      localStorage.setItem("coords", JSON.stringify(coordinates));
      console.log(coordinates);
    }
  }

  updateGraph = (prevID, curID, dir) => {
    console.log(graph);
    if (prevID === curID) {
      return
    }
    graph[prevID][dir] = curID;
    if (dir === "n") {
        graph[curID]["s"] = prevID;
    }
    if (dir === "s") {
        graph[curID]["n"] = prevID;
    }
    if (dir === "e") {
        graph[curID]["w"] = prevID;
    }
    if (dir === "w") {
        graph[curID]["e"] = prevID;
    }
    localStorage.setItem("map", JSON.stringify(graph))
  }

  bfs = (start) => {
    let q = [];
    q.push([start]);
    let visited = new Set();
    let path;
    let new_path;
    let v;

    while (q.length) {
        path = q.shift();
        console.log(path);
        v = path[path.length - 1];
        console.log(v);
        // if (Object.values(graph[v]).includes("?")) { 
        if (coordinates.hasOwnProperty(v) === false) {
            new_path = Array.from(path);
            new_path.push(v);
            console.log(new_path);
            return new_path;
        }
        if (visited.has(v) === false) {
            visited.add(v);
            for (let key in graph[v]) {
                new_path = Array.from(path);
                new_path.push(graph[v][key]);
                q.push(new_path)
            }
        }
    }
}

  sleep = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

async automatedTraversal() {
  console.log(Object.keys(graph).length)
  while(Object.keys(graph).length < 500 || Object.keys(coordinates).length < 500) {
    console.log(Object.keys(coordinates).length)
    for (let exit in graph[this.state.room_id]) {
      if (graph[this.state.room_id][exit] === "?") {
          console.log(exit);
          // setTimeout(this.changeRoom, this.state.cooldown * 2500, exit);
          this.changeRoom(exit);
          break;
      }
    }
    await this.sleep(this.state.cooldown * 1100);
    let path;
    if (Object.values(graph[this.state.room_id]).includes('?') === false) {
        if (path === undefined) {
            path = this.bfs(this.state.room_id);
        } 
        console.log(this.state.room_id)
        if (path[0] === this.state.room_id) {
            path.shift();
            console.log(path);
        }
        await this.sleep(this.state.cooldown * 1100);
        if (path[0] === graph[this.state.room_id]["n"]) {
          
          this.changeRoom("n", path[0].toString());
        }
        if (path[0] === graph[this.state.room_id]["s"]) {
          this.changeRoom("s", path[0].toString());
        }
        if (path[0] === graph[this.state.room_id]["e"]) {
          this.changeRoom("e", path[0].toString());
        }
        if (path[0] === graph[this.state.room_id]["w"]) {
          console.log("inside w")
          this.changeRoom("w", path[0].toString());
        }
    }
    await this.sleep(this.state.cooldown * 1100);
  }
      console.log("you traveled the whole map!")
}
  
  render() {
    return (
      <div className="App">
        <DirectionButton direction="North" changeRoom={this.changeRoom}/>
        <DirectionButton direction="South" changeRoom={this.changeRoom}/>
        <DirectionButton direction="East" changeRoom={this.changeRoom}/>
        <DirectionButton direction="West" changeRoom={this.changeRoom}/>
        <div onClick={this.automatedTraversal}>Explore</div>
        <p>Current Room # is {this.state.room_id}</p>
        <p>Room Title: {this.state.title}</p>
        <p>Room Coordinates: {this.state.coordinates}</p>
        <p>Cooldown: {this.state.cooldown}</p>
        <p>Room Description: {this.state.description}</p>
        <p>Exits: {this.state.exits}</p>
        <p>Items: {this.state.items}</p>
        {Object.values(graph).length > 0 ?
        <Map map={graph} coords={coordinates}/>:
        null}
      </div>
    );
  }
}

export default App;

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
        if (lastRoomID === undefined) {
          lastRoomID = this.state.room_id;
        }
        this.populateGraph(this.state.room_id, this.state.exits);
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
        this.setState({ ...this.state, room_id, title, description, coordinates, cooldown, elevation, exits, items, messages, players, terrain});
        this.populateGraph(this.state.room_id, this.state.exits);
        this.updateGraph(lastRoomID, this.state.room_id, dir);
        console.log("changing", Math.floor(Date.now() / 1000))
      })
      .catch(error => {
        console.log(error);
      })
  }

  populateGraph = (curID, exits) => {
    graph = JSON.parse(localStorage.getItem("map"));
    if (graph.hasOwnProperty(curID) === false) {
        graph[curID] = {};
        for (let e of exits) {
            graph[curID][e] = "?";
        }
    } else {
        return;
    }
  }

  updateGraph = (prevID, curID, dir) => {
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
    lastRoomID = this.state.room_id;
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
        if (Object.values(graph[v]).includes("?")) {
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

automatedTraversal = () => {
  let roomID = this.state.room_id
  let exit;
  for (exit in graph[roomID]) {
    if (graph[roomID][exit] === "?") {
        console.log(exit);
        setTimeout(this.changeRoom, this.state.cooldown * 2500, exit);
        break;
    }
  }
  let path;
  while (Object.values(graph[roomID]).includes('?') === false) {
      if (path === undefined) {
          path = this.bfs(roomID);
      } 
      console.log(path, path.length, graph[roomID]);
      if (path.length === 0) {
          break;
      }
      if (path[0] === roomID) {
          path.shift();
          console.log(path);
      }
      if (path[0] === graph[roomID]["n"]) {
        setTimeout(this.changeRoom, this.state.cooldown * 2500, "n");
        break;
      }
      if (path[0] === graph[roomID]["s"]) {
        setTimeout(this.changeRoom, this.state.cooldown * 2500, "s");
        break;
      }
      if (path[0] === graph[roomID]["e"]) {
        setTimeout(this.changeRoom, this.state.cooldown * 2500, "e");
        break;
      }
      if (path[0] === graph[roomID]["w"]) {
        console.log("inside w")
        setTimeout(this.changeRoom, this.state.cooldown * 2500, "w");
        break;
      }
          }
      
  
  if (Object.keys(graph).length < 50) {
      setTimeout(this.automatedTraversal, this.state.cooldown * 2500);
  } else {
      return;
  }
}
  
  render() {
    return (
      <div className="App">
        <DirectionButton direction="North" changeRoom={this.changeRoom}/>
        <DirectionButton direction="South" changeRoom={this.changeRoom}/>
        <DirectionButton direction="East" changeRoom={this.changeRoom}/>
        <DirectionButton direction="West" changeRoom={this.changeRoom}/>
        <div onClick={e => this.automatedTraversal()}>Explore</div>
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

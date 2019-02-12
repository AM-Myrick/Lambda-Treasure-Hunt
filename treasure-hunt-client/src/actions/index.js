import axios from "axios";
export const FETCH_ROOM = "FETCH_ROOM";
export const FETCH_ROOM_SUCCESS = "FETCH_ROOM_SUCCESS";
export const FETCH_ROOM_FAILURE = "FETCH_ROOM_FAILURE";
export const CHANGE_ROOM = "CHANGE_ROOM";
export const CHANGE_ROOM_SUCCESS = "CHANGE_ROOM_SUCCESS";
export const CHANGE_ROOM_FAILURE = "CHANGE_ROOM_FAILURE";
export const GET_ITEM = "GET_ITEM";
export const GET_ITEM_SUCCESS = "GET_ITEM_SUCCESS";
export const GET_ITEM_FAILURE = "GET_ITEM_FAILURE";
export const DROP_ITEM = "DROP_ITEM";
export const DROP_ITEM_SUCCESS = "DROP_ITEM_SUCCESS";
export const DROP_ITEM_FAILURE = "DROP_ITEM_FAILURE";
export const PRAY = "PRAY";
export const PRAY_SUCCESS = "PRAY_SUCCESS";
export const PRAY_FAILURE = "PRAY_FAILURE";
export const SELL = "SELL";
export const SELL_SUCCESS = "SELL_SUCCESS";
export const SELL_FAILURE = "SELL_FAILURE";

const token = process.env.REACT_APP_TOKEN;
const curRoomURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/init/"
const moveURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/fly/"
const dropURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/"
const getURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/take/"
const shrineURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/pray/"
const sellURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/sell/"

const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
}

export let graph = {}
// let coordinates = {}

export const fetchRoom = () => dispatch => {
  dispatch({type: FETCH_ROOM });
  axios
    .get(curRoomURL, {headers: headers})
    .then(res => {
      dispatch({type: FETCH_ROOM_SUCCESS, payload: res.data})
      populateGraph(res.data.room_id, res.data.exits)
      console.log(graph)
    })
    .catch(error => {
      dispatch({type: FETCH_ROOM_FAILURE, payload: error})
    })
}

export const changeRoom = (e, dir) => dispatch => {
    e.preventDefault()
    let lastRoomID
    axios
        .get(curRoomURL, {headers: headers})
        .then(res => {
            lastRoomID = res.data.room_id
        })
        .catch(err => {
            console.log(err)
        })
    
    dispatch({type: CHANGE_ROOM});
    axios
        .post(moveURL, {"direction": dir}, {headers: headers})
        .then(res => {
            dispatch({type: CHANGE_ROOM_SUCCESS, payload: res.data})
            if (lastRoomID === undefined) {
                lastRoomID = 0
            }
            populateGraph(res.data.room_id, res.data.exits)
            updateGraph(lastRoomID, res.data.room_id, dir)
        })
        .catch(error => {
            dispatch({type: CHANGE_ROOM_FAILURE, payload: error})
        })
}

const populateGraph = (curID, exits) => {
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

const updateGraph = (prevID, curID, dir) => {
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

export const getItem = (e, item) => dispatch => {
    e.preventDefault()
    dispatch({type: GET_ITEM});
    axios
        .post(getURL, {"name": item}, {headers: headers})
        .then(res => {
            dispatch({type: GET_ITEM_SUCCESS, payload: res.data})
        })
        .catch(error => {
            dispatch({type: GET_ITEM_FAILURE, payload: error})
        })
}

export const dropItem = (e, item) => dispatch => {
    e.preventDefault()
    dispatch({type: DROP_ITEM});
    axios
        .post(dropURL, {"name": item}, {headers: headers})
        .then(res => {
            dispatch({type: DROP_ITEM_SUCCESS, payload: res.data})
        })
        .catch(error => {
            dispatch({type: DROP_ITEM_FAILURE, payload: error})
        })
}

export const prayAtShrine = (e) => dispatch => {
    e.preventDefault();
    dispatch({type: PRAY});
    axios
        .post(shrineURL, null, {headers: headers})
        .then(res => {
            dispatch({type: PRAY_SUCCESS, payload: res.data})
        })
        .catch(error => {
            dispatch({type: PRAY_FAILURE, payload: error})
        })
}

export const sellItem = (e, item) => dispatch => {
    e.preventDefault();
    dispatch({type: SELL});
    axios
        .post(sellURL, {"name": item, "confirm": "yes"}, {headers: headers})
        .then(res => {
            dispatch({type: SELL_SUCCESS, payload: res.data})
        })
        .catch(error => {
            dispatch({type: SELL_FAILURE, payload: error})
        })
}
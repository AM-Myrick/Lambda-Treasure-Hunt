import { FETCH_ROOM, FETCH_ROOM_SUCCESS, 
        FETCH_ROOM_FAILURE, CHANGE_ROOM,
        CHANGE_ROOM_SUCCESS, CHANGE_ROOM_FAILURE,
        GET_ITEM, GET_ITEM_SUCCESS, GET_ITEM_FAILURE,
        DROP_ITEM, DROP_ITEM_SUCCESS, DROP_ITEM_FAILURE,
        PRAY, PRAY_SUCCESS, PRAY_FAILURE, } from "../actions";

const initialState = {
    fetchingRoom: false,
    changingRoom: false,
    gettingItem: false,
    droppingItem: false,
    message: "",
    title: "",
    cooldown: "",
    description: "",
    exits: "",
    items: "",
   error: null
 }

const treasureHuntReducer = (state = initialState, action) => {
  switch(action.type) {
    case FETCH_ROOM:
      return {...state, fetchingRoom: true};

    case FETCH_ROOM_SUCCESS:
      return {...state, 
            fetchingRoom: false,
            title: action.payload.title, 
            cooldown: action.payload.cooldown, 
            description: action.payload.description,
            exits: action.payload.exits,
            items: action.payload.items};

    case FETCH_ROOM_FAILURE:
      return {...state, fetchingRoom: false, error: action.payload};

    case CHANGE_ROOM:
        return {...state, changingRoom: true};
    
    case CHANGE_ROOM_SUCCESS:
        return {...state,
            changingRoom: false,
            title: action.payload.title, 
            cooldown: action.payload.cooldown, 
            description: action.payload.description,
            exits: action.payload.exits,
            items: action.payload.items}

    case CHANGE_ROOM_FAILURE:
        return {...state, changingRoom: false, error: action.payload};

    case GET_ITEM:
        return {...state, gettingItem: true};

    case GET_ITEM_SUCCESS:
        return {...state, gettingItem: false, message: action.payload.messages[0]}

    case GET_ITEM_FAILURE:
        return {...state, gettingItem: false, error: action.payload};

    case DROP_ITEM:
        return {...state, droppingItem: true};
    
    case DROP_ITEM_SUCCESS:
        return {...state, droppingItem: false, message: action.payload.messages[0]}

    case DROP_ITEM_FAILURE:
        return {...state, droppingItem: false, error: action.payload}

    case PRAY:
        return {...state, praying: true}

    case PRAY_SUCCESS:
        return {...state, praying: false}

    case PRAY_FAILURE:
        return {...state, praying: false}

    default:
      return state
  }
}

export default treasureHuntReducer;
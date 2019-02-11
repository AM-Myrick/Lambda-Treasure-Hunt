import React, { Component } from 'react';
import axios from "axios";
const token = process.env.REACT_APP_TOKEN;
const URL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/move/"
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
}

class DirectionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    move = (e, dir) => {
        e.preventDefault()
        axios.post(URL, {"direction": dir}, {headers: headers})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }
    render() {
        return (
            <button onClick={e => this.move(e, this.props.direction[0].toLowerCase())}>{this.props.direction}</button>
        );
    }

}


export default DirectionButton
import React, { Component } from 'react';
import axios from "axios";
const token = process.env.REACT_APP_TOKEN;
const dropURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/drop/"
const getURL = "https://lambda-treasure-hunt.herokuapp.com/api/adv/take/"
const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Token ${token}`
}

class TreasureInteraction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getItem: "",
            dropItem: "",
            getMessage: "",
            dropMessage: "",
        }
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value })
    }

    getItem = (e, item) => {
        e.preventDefault();
        axios.post(getURL, {"name": item}, {headers: headers})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    dropItem = (e, item) => {
        e.preventDefault();
        axios.post(dropURL, {"name": item}, {headers: headers})
            .then((res) => console.log(res))
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div className="login">
                <form onSubmit={e => this.getItem(e, this.state.getItem)}>
                <label>Pick up item:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="input"
                        value={this.state.getItem}
                        onChange={this.changeHandler} />
                    
                </form>
                { this.state.getMessage ?
                    (<h4>{this.state.getMessage}</h4>):
                    undefined}
                <form onSubmit={this.submitHandler}>
                    <label>Drop item:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        className="input"
                        value={this.state.dropItem}
                        onChange={this.changeHandler} />
                    
                </form>
                { this.state.dropMessage ?
                    (<h4>{this.state.dropMessage}</h4>):
                    undefined}
            </div>
        );
    }
}

export default TreasureInteraction;
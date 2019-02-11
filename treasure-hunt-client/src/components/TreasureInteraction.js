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
        if (item === "" || item === undefined) {
            this.setState({ ...this.state, getMessage: "It's not possible to get nothing, unfortunately."})
            return
        }
        axios.post(getURL, {"name": item}, {headers: headers})
            .then((res) => {
                console.log(res)
                this.setState({ ...this.state, getItem: "", getMessage: res.data.messages[0]})

            })
            .catch((err) => console.log(err))
    }

    dropItem = (e, item) => {
        e.preventDefault();
        if (item === "" || item === undefined) {
            this.setState({ ...this.state, dropMessage: "It's not possible to drop nothing, unfortunately."})
            return
        }
        axios.post(dropURL, {"name": item}, {headers: headers})
        .then((res) => {
            console.log(res)
            this.setState({ ...this.state, dropItem: "", dropMessage: res.data.messages[0]})
        })
            .catch((err) => console.log(err))
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.getItem(e, this.state.getItem)}>
                <label>Pick up item:</label>
                    <input 
                        type="text" 
                        id="getItem" 
                        name="getItem" 
                        className="input"
                        value={this.state.getItem}
                        onChange={this.changeHandler} />
                    <button onClick={e => this.getItem(e, this.state.getItem)}>Pick Up</button>  
                </form>
                { this.state.getMessage ?
                    (<h4>{this.state.getMessage}</h4>):
                    undefined}
                <form onSubmit={e => this.dropItem(e, this.state.dropItem)}>
                    <label>Drop item:</label>
                    <input 
                        type="text" 
                        id="dropItem" 
                        name="dropItem" 
                        className="input"
                        value={this.state.dropItem}
                        onChange={this.changeHandler} />
                    <button onClick={e => this.dropItem(e, this.state.dropItem)}>Drop</button>
                </form>
                { this.state.dropMessage ?
                    (<h4>{this.state.dropMessage}</h4>):
                    undefined}
            </div>
        );
    }
}

export default TreasureInteraction;
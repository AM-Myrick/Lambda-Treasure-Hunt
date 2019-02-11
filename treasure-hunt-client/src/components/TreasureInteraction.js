import React, { Component } from 'react';
import { connect } from "react-redux";
import { getItem, dropItem, sellItem, prayAtShrine } from "../actions";

class TreasureInteraction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            getItem: "",
            dropItem: "",
            sellItem: ""
        }
    }

    changeHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value })
    }

    render() {
        return (
            <div>
                <form onSubmit={e => this.props.getItem(e, this.state.getItem)}>
                <label>Pick up item:</label>
                    <input 
                        type="text" 
                        id="getItem" 
                        name="getItem" 
                        className="input"
                        value={this.state.getItem}
                        onChange={this.changeHandler} />
                    <button onClick={e => this.props.getItem(e, this.state.getItem)}>Pick Up</button>  
                </form>
                <form onSubmit={e => this.props.dropItem(e, this.state.dropItem)}>
                    <label>Drop item:</label>
                    <input 
                        type="text" 
                        id="dropItem" 
                        name="dropItem" 
                        className="input"
                        value={this.state.dropItem}
                        onChange={this.changeHandler} />
                    <button onClick={e => this.props.dropItem(e, this.state.dropItem)}>Drop</button>
                </form>
                <form onSubmit={e => this.props.sellItem(e, this.state.sellItem)}>
                    <label>Sell item:</label>
                    <input 
                        type="text" 
                        id="sellItem" 
                        name="sellItem" 
                        className="input"
                        value={this.state.sellItem}
                        onChange={this.changeHandler} />
                    <button onClick={e => this.props.sellItem(e, this.state.sellItem)}>Sell</button>
                </form>
                <button onClick={e => this.props.prayAtShrine(e)}>Pray</button>
                { this.props.message ?
                    (<h4>{this.props.message}</h4>):
                    undefined}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        gettingItem: state.gettingItem,
        droppingItem: state.droppingItem,
        message: state.message
    }
}
export default connect(
    mapStateToProps,
    { getItem, dropItem, sellItem, prayAtShrine }
)(TreasureInteraction);
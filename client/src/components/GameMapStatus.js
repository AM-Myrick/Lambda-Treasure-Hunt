import React, { Component } from 'react';
import { connect } from "react-redux";
import { fetchRoom } from "../actions";

class GameMapStatus extends Component {

    componentDidMount() {
        this.props.fetchRoom()
    }
    
    render() {
        return (
            <div>
                <p>Current Room # is {this.props.curRoomID}</p>
                <p>Room Title: {this.props.title}</p>
                <p>Room Coordinates: {this.props.coordinates}</p>
                <p>Cooldown: {this.props.cooldown}</p>
                <p>Room Description: {this.props.description}</p>
                <p>Exits: {this.props.exits}</p>
                <p>Items: {this.props.items}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.title,
        coordinates: state.coordinates,
        curRoomID: state.curRoomID,
        cooldown: state.cooldown,
        description: state.description,
        exits: state.exits,
        items: state.items,
    }
}
export default connect(
    mapStateToProps,
    { fetchRoom }
)(GameMapStatus);
import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeRoom } from "../actions";

let nextID
class DirectionButton extends Component {

    render() {
        // attempt to get wise explorer, buggy
        // if (this.props.curRoomID) {
        // if (graph.hasOwnProperty(this.props.curRoomID)) {
        //     if (graph[this.props.curRoomID].hasOwnProperty(this.props.direction[0].toLowerCase())) {
        //         if (graph[this.props.curRoomID][this.props.direction[0].toLowerCase()] !== "?") {
        //             console.log("graph", this.props.curRoomID)
        //             nextID = graph[this.props.curRoomID][this.props.direction[0].toLowerCase()]
        //         }
        //     }
        // }
        return (
            <button onClick={e => this.props.changeRoom(e, this.props.direction[0].toLowerCase(), nextID)}>{this.props.direction}</button>
        );
        } 
        // else {
        //     return null;
        // }

}

const mapStateToProps = state => {
    return {
        curRoomID: state.curRoomID,
        changingRoom: state.changingRoom
    }
}
export default connect(
    mapStateToProps,
    { changeRoom }
)(DirectionButton);
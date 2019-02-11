import React, { Component } from 'react';
import { connect } from "react-redux";
import { changeRoom } from "../actions";

class DirectionButton extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <button onClick={e => this.props.changeRoom(e, this.props.direction[0].toLowerCase())}>{this.props.direction}</button>
        );
    }

}

const mapStateToProps = state => {
    return {
        changingRoom: state.changingRoom
    }
}
export default connect(
    mapStateToProps,
    { changeRoom }
)(DirectionButton);
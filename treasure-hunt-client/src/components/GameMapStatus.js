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
                <p>{this.props.title}</p>
                <p>{this.props.coordinates}</p>
                <p>{this.props.cooldown}</p>
                <p>{this.props.description}</p>
                <p>{this.props.exits}</p>
                <p>{this.props.items}</p>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.title,
        coordinates: state.coordinates,
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
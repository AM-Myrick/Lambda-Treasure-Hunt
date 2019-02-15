import React, { Component } from 'react';
class DirectionButton extends Component {

    render() {
        return (
            <div onClick={e => this.props.changeRoom(this.props.direction[0].toLowerCase())}>{this.props.direction}</div>
        );
        } 
}

export default DirectionButton;
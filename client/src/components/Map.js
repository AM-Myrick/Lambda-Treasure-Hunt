import React, { Component } from 'react';

const roomStyles = {
    position: "absolute",
    display: "block",
    fontsize: "16px",
    width: "20px",
    height: "20px",
    backgroundcolor: "gray",
    color: "black"
}

const exitStyles = {
    position: "absolute",
    display: "block",
    width: "6px",
    height: "6px",
    backgroundcolor: "black",
}
class Map extends Component {

    

    render() {
        console.log(this.props.map)
        console.log(this.props.coords)
        for (let i = 0; i < 501; i++) {
            let rooms = this.props.map[i];
            if (this.props.coords.hasOwnProperty(i)) {
                let coordinates = [+this.props.coords[0] - 45, 30 - (+this.props.coords[1] -45)];
                roomStyles["left"] = coordinates[0] * 32
                roomStyles["top"] = coordinates[1] * 32
            }
            return <div styles={roomStyles}>{i}</div>
        }
    }
}

export default Map;
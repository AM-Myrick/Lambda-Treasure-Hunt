import React, { Component } from 'react';
import { connect } from "react-redux";
import { getItem, dropItem, sellItem, prayAtShrine, changeRoom, graph } from "../actions";

class WorldInteraction extends Component {
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

    automatedTraversal = (e) => {
        let roomID = this.props.curRoomID;
        e.preventDefault();
        for (let exit in graph[roomID]) {
            if (graph[roomID][exit] === "?") {
                console.log(exit);
                console.log(this.props.cooldown)
                this.props.changeRoom(e, exit)
                break;
            }
        // while (Object.keys(graph).length < 10) {
        
        //     }
        }
        if (Object.keys(graph).length < 20) {
            setTimeout(this.automatedTraversal, this.props.cooldown, e)
        }
    }

    // for e in graph[player.currentRoom.id]:
    //         if graph[player.currentRoom.id][e] == "?":
    //             print(player.currentRoom.id, graph[player.currentRoom.id], e)
    //             move = e
    //             traversalPath.append(move)
    //             player.travel(move)
    //             visited_rooms.add(player.currentRoom.id)
    //             populateGraph(player.currentRoom)
    //             updateGraph(lastRoom.id, player.currentRoom.id, move)
    //             lastRoom = player.currentRoom
    //             break
    //         if "?" not in list(graph[player.currentRoom.id].values()):
    //             for k, v in graph.items():
    //                 if "?" in v.values():
    //                     path = bfs_path(player.currentRoom.id)
    //                     print(path)
    //                     for i in path:
    //                         for k, v in graph[player.currentRoom.id].items():
    //                             if v == i:
    //                                 traversalPath.append(k)
    //                                 player.travel(k)
    //                                 visited_rooms.add(player.currentRoom.id)
    //                                 populateGraph(player.currentRoom)
    //                                 updateGraph(lastRoom.id, player.currentRoom.id, k)
    //                                 lastRoom = player.currentRoom
    //                                 if "?" in list(graph[player.currentRoom.id].values()):

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
                <button onClick={e => this.automatedTraversal(e)}>Explore</button>
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
        cooldown: state.cooldown,
        message: state.message,
        curRoomID: state.curRoomID,
    }
}
export default connect(
    mapStateToProps,
    { getItem, dropItem, sellItem, prayAtShrine, changeRoom }
)(WorldInteraction);
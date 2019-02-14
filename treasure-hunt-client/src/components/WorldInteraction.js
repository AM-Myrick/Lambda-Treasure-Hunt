import React, { Component } from 'react';
import { connect } from "react-redux";
import { getItem, dropItem, sellItem, prayAtShrine, changeRoom, graph, wait } from "../actions";

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

    bfs = (start) => {
        let q = [];
        q.push([start]);
        let visited = new Set();
        let path;
        let new_path;
        let v;

        while (q.length) {
            path = q.shift();
            console.log(path);
            v = path[path.length - 1];
            console.log(v);
            if (Object.values(graph[v]).includes("?")) {
                new_path = Array.from(path);
                new_path.push(v);
                console.log(new_path);
                return new_path;
            }
            if (visited.has(v) === false) {
                visited.add(v);
                for (let key in graph[v]) {
                    new_path = Array.from(path);
                    new_path.push(graph[v][key]);
                    q.push(new_path)
                }
            }
        }
    }

    // def bfs_path(starting_vertex_id):
    //     q = Queue()
    //     q.enqueue([starting_vertex_id])
    //     visited = set()
    //     while q.len() > 0:
    //         path = q.dequeue()
    //         v = path[-1]
    //         print("v", v)
    //         print("path", path)
    //         if "?" in list(graph[v].values()):
    //             new_path = list(path)
    //             new_path.append(v)
    //             return new_path
    //         if v not in visited:
    //             visited.add(v)
    //             for k, v in graph[v].items():
    //                 new_path = list(path)
    //                 new_path.append(v)
    //                 q.enqueue(new_path)
    //     return None
    
    automatedTraversal = (e) => {
        let roomID = this.props.curRoomID;
        e.preventDefault();
        e.persist();
        for (let exit in graph[roomID]) {
            if (graph[roomID][exit] === "?") {
                console.log(exit);
                console.log(this.props.cooldown)
                wait(this.props.cooldown * 5000).then(() => {
                    this.props.changeRoom(e, exit);
                })
            }
        }
        let path;
        while (Object.values(graph[roomID]).includes('?') === false) {
            if (path === undefined) {
                path = this.bfs(roomID);
            } 
            console.log(path, path.length);
            if (path.length === 0) {
                break;
            }
            if (path[0] === roomID) {
                path.shift();
                console.log(path);
            }
            if (path[0] === graph[roomID]["n"]) {
                console.log(e)
                this.delayedChangeRoom(e, "n");
            }
            if (path[0] === graph[roomID]["s"]) {
                this.delayedChangeRoom(e, "s");
            }
            if (path[0] === graph[roomID]["e"]) {
                this.delayedChangeRoom(e, "e");
            }
            if (path[0] === graph[roomID]["w"]) {
                this.delayedChangeRoom(e, "w");
            }
        // if (Object.values(graph[roomID]).includes('?') === false) {
        //     for (let key in graph) {
        //         if (Object.values(graph[key]).includes("?")) {
        //             let path = this.bfs(roomID);
        //             console.log(path);
                    // for(let i of path) {
                    //     if (i === roomID) {
                    //         continue;
                    //     } else {
                    //         for (let j in graph[roomID]) {
                    //             console.log(j)
                    //             if (graph[roomID][j] === i) {
                    //                 wait(5000).then(() => {
                    //                     this.props.changeRoom(e, j);
                    //                     console.log("roomID", roomID);
                    //                 })
                    //             }
                    //         }
                    //     }

                    // }
                }
            
        
        if (Object.keys(graph).length < 10) {
            this.automatedTraversal(e);
        } else {
            return;
        }
    }

    delayedChangeRoom = (e, dir) => {
        e.persist();
        wait(5000).then(() => {
            this.props.changeRoom(e, dir);
        })
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
    { getItem, dropItem, sellItem, prayAtShrine, changeRoom, wait }
)(WorldInteraction);
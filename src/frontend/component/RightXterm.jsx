import React from "react"
import { io } from 'socket.io-client';
import {Button} from "antd"
import XtermTest from "./XtermTest"
 
const socket = io("http://localhost:8000");
 
class RightXterm extends React.Component {
    constructor(props) {
        super(props);
        this.createServer = this.createServer.bind(this);
        this.term = null;
    }
 
    createServer() {
        socket.emit("createNewServer", {msgId: 'pi', ip: "192.168.11.111", username: "pi", password: "123123"});
        let term = this.term.getTerm();
        term.onData((val)=>
        {
            console.log(val);
            socket.emit('pi', val);
        });
        socket.on("pi", function (data) {
            console.log(data)
            term.write(data)
        });
    }
 
    render() {
        return  <div>
                    <XtermTest ref={(term) => {this.term = term}} id="pi"/>
                </div>
    }
}
 
export default RightXterm
import React from "react"
import { io } from 'socket.io-client';
import XtermTest from "./XtermTest"
 
const socket = io("http://localhost:8000");
 
class RightXterm extends React.Component {
    constructor(props) {
        super(props);
        this.createServer = this.createServer.bind(this);
        this.term = null;
    }
 
    createServer(serverName, msgId, ip, username, password) {
        console.log(serverName);
        socket.emit('createNewServer', {msgId: msgId, ip: ip, username: username, password: password});
        let term = this.term.getTerm();
        term.onData((val)=>
        {
            console.log(val);
            socket.emit(msgId, val);
        });
        socket.on(msgId, function (data) {
            console.log(data)
            term.write(data)
        });
    }
 
    render() {
        return  <div>
                    <XtermTest ref={(term) => {this.term = term}} id={this.props.id} />
                </div>
    }
}
 
export default RightXterm
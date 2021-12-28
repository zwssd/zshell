import React from "react"
import { io } from 'socket.io-client';
import XtermShow from "./XtermShow"
 
const socket = io("http://localhost:8000");
 
class CenterXterm extends React.Component {
    constructor(props) {
        super(props);
        this.createServer = this.createServer.bind(this);
        this.term = null;
    }
 
    createServer(msgId, port, ip, username, password) {
        //console.log("createServer===================="+msgId+"=="+ip+"=="+port+"=="+username+"=="+password);
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
        return <XtermShow ref={(term) => {this.term = term}} id={this.props.id} />
    }
}
 
export default CenterXterm
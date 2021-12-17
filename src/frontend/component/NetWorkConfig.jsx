import React from "react"
import { io } from 'socket.io-client';
import {Button} from "antd"
import XtermTest from "./XtermTest"
 
const socket = io("http://localhost:8000");
 
class NetWorkConfig extends React.Component {
    constructor(props) {
        super(props);
        this.createServer1 = this.createServer1.bind(this);
        this.createServer2 = this.createServer2.bind(this);
        this.term1 = null;
        this.term2 = null;
    }
 
    createServer1() {
        socket.on('connect', () => {
            console.log('connect!');
            socket.emit('createNewServer', {msgId: 'pi', ip: "192.168.11.111", username: "pi", password: "123123"});
        });
          
        socket.on('createNewServer', msg => {
            console.log('Msg from server:', msg);
        });
        socket.emit("createNewServer", {msgId: 'pi', ip: "192.168.11.111", username: "pi", password: "123123"});
        let term = this.term1.getTerm();
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
 
    createServer2() {
        socket.emit("createNewServer", {msgId: 'net2', ip: "192.168.11.111", username: "pi", password: "123123"});
        let term = this.term2.getTerm();
        term.on("data", function(data) {
            socket.emit('net2', data);
        })
        socket.on("net2", function (data) {
            term.write(data)
        })
    }
 
    render() {
        return <div>
                    <Button onClick={this.createServer1}>按钮1</Button>
                    <Button onClick={this.createServer2}>按钮2</Button>
                    <XtermTest ref={(term1) => {this.term1 = term1}} id="pi"/>
                    <XtermTest ref={(term2) => {this.term2 = term2}} id="net2"/>
                </div>
 
    }
    
}
 
export default NetWorkConfig
import React from "react"
import { Terminal } from 'xterm';
import "xterm/css/xterm.css";
import "xterm/lib/xterm.js";
import FitAddon from "xterm-addon-fit";
 
class XtermTest extends React.Component {
    constructor(props) {
        super(props)
        this.getTerm = this.getTerm.bind(this);
    }
 
    render() {
        return <div id={this.props.id}></div>
    }
 
    getTerm() {
        return this.term;
    }
 
    componentDidMount() {
        //Terminal.applyAddon(fit);
        let {id} = this.props;
        let terminalContainer = document.getElementById(id);

        this.term = new Terminal({
            rendererType: "canvas", //渲染类型
            rows: 10, //行数
            // cols: parseInt(_this.cols), // 不指定行数，自动回车后光标从下一行开始
            convertEol: true, //启用时，光标将设置为下一行的开头
            //   scrollback: 50, //终端中的回滚量
            disableStdin: false, //是否应禁用输入。
            cursorStyle: "underline", //光标样式
            cursorBlink: true, //光标闪烁
            theme: {
                foreground: "#7e9192", //字体
                background: "#002833", //背景色
                cursor: "help", //设置光标
                lineHeight: 16
            }
        });

        this.term.open(terminalContainer);
        // 换行并输入起始符“$”
        this.term.prompt = () => {
            this.term.write("\r\n$ ");
        };
        this.term.prompt();
    }
 
}
 
export default XtermTest
import { Tabs, Button } from 'antd';
import React, { Component } from "react";
import CenterXterm from "./CenterXterm";
import AddSsh from "./AddSsh";

const { TabPane } = Tabs;
let data = [];// 总数据

class CenterTabs extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = new Array(1).fill(null).map((_, index) => {
            const id = String(index + 1);
            return { title: `Tab ${id}`, content: CenterXterm, key: id };
        });
        this.state = {
            activeKey: panes[0].key,
            panes,
            visible:false,
            formData:[] // 当前需要传递给子组件的数据，用于显示form表单初始值
        };
        this.Child = React.createRef();   //// 创建一个ref去储存DOM子元素
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        this.changeVisible(true);
    };

    remove = targetKey => {
        let { activeKey } = this.state;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (panes.length && activeKey === targetKey) {
            if (lastIndex >= 0) {
                activeKey = panes[lastIndex].key;
            } else {
                activeKey = panes[0].key;
            }
        }
        this.setState({ panes, activeKey });
    };

    childCreateServer(serverName, msgId, ip, username, password) {
        console.log('childCreateServer');
        this.Child.current.createServer(serverName, msgId, ip, username, password)   //调用子元素函数 show   (括号里可以传参)
    };

    // 弹框显示状态、及当前需要展示的数据赋值
    changeVisible = (status,index) =>{
        this.setState({
            visible:status,
        })
        if(index != undefined){
            console.log(data[index]);
            this.setState({
                formData:data[index]
            })
        }
    };

    onOk = (status) => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: CenterXterm, key: activeKey });
        this.setState({ panes, activeKey });
        //console.log(values);
        this.setState({
            visible:status,
        });
        //this.childCreateServer(values.label, this.state.activeKey, values.host, values.uname, values.passwd)
    };

    render() {
        return (
            <div className="App">
                <AddSsh
                    visible={this.state.visible}
                    onOk={() => {
                        this.onOk(false);
                    }}
                    onCancel={() => {
                        this.changeVisible(false);
                    }}
                />
                <Tabs
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                    className={'App'}
                >
                    {this.state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key} className={"App"}>
                            <pane.content ref={this.Child} id={pane.key}></pane.content>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

export default CenterTabs;
import { Tabs, Button } from 'antd';
import React, { Component } from "react";
import RightXterm from "./RightXterm";
import AddSsh from "./AddSsh";

const { TabPane } = Tabs;

class RightTabs extends Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = new Array(2).fill(null).map((_, index) => {
            const id = String(index + 1);
            return { title: `Tab ${id}`, content: RightXterm, key: id };
        });
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
        this.Child = React.createRef();   //// 创建一个ref去储存DOM子元素
        this.Modal = React.createRef();   //// 创建一个ref去储存DOM子元素
    }

    onChange = activeKey => {
        this.setState({ activeKey });
    };

    onEdit = (targetKey, action) => {
        this[action](targetKey);
    };

    add = () => {
        const { panes } = this.state;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: RightXterm, key: activeKey });
        this.setState({ panes, activeKey });
        this.modalShowModal();
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

    childCreateServer() {
        this.Child.current.createServer()   //调用子元素函数 show   (括号里可以传参)
    };

    modalShowModal() {
        this.Modal.current.showModal()   //调用子元素函数 show   (括号里可以传参)
    };

    render() {
        return (
            <div>
                <AddSsh ref={this.Modal} />
                <Tabs
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.state.panes.map(pane => (
                        <TabPane tab={pane.title} key={pane.key}>
                            <Button onClick={()=>{this.childCreateServer()}}>new按钮</Button>
                            <pane.content ref={this.Child}></pane.content>
                        </TabPane>
                    ))}
                </Tabs>
            </div>
        );
    }
}

export default RightTabs;
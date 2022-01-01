import React, {Component} from 'react';
import {Table, Tag, Space, Button, Modal } from 'antd';
const { Column, ColumnGroup } = Table;

const Datastore = require('nedb');
let data_db = new Datastore({
    filename: 'zshelldata.db',
    autoload: true
});

const count = 10;
const fakeDataUrl = `https://randomuser.me/api/?results=${count}&inc=name,gender&noinfo`;

class ListSsh extends Component {
    tableData = [];
    host = '';
    port = '';
    uname = '';
    passwd = '';
    constructor(props) {
        super(props);
        this.state = {
            initLoading: true,
            loading: false,
            data: [],
            list: [],
        };
    };

    componentDidMount() {
        // 查询多项
        data_db.find({} ).sort({ _id: -1 }).limit(count).exec((err, docs) => {
            Object.keys(docs).forEach((k) => {
                Object.keys(docs[k]).forEach((kk,vv)=>{
                    if(kk==="host"){
                        this.host = docs[k][kk];
                    }
                    if(kk==="port"){
                        this.port = docs[k][kk];
                    }
                    if(kk==="uname"){
                        this.uname = docs[k][kk];
                    }
                    if(kk==="passwd"){
                        this.passwd = docs[k][kk];
                    }
                });
                this.tableData.push({
                    host: this.host,
                    port: this.port,
                    uname: this.uname,
                    passwd: this.passwd
                });
            });
            //console.log(this.tableData);
            this.setState({
                initLoading: false,
                data: this.tableData,
                list: this.tableData
            });
        });
    };

    onLoadMore = () => {
        this.setState({
            loading: true,
            list: this.state.data.concat(
                [...new Array(count)].map(() => ({ loading: true, name: {}, picture: {} })),
            ),
        });
        fetch(fakeDataUrl)
            .then(res => res.json())
            .then(res => {
                const data = this.state.data.concat(res.results);
                this.setState(
                    {
                        data,
                        list: data,
                        loading: false,
                    },
                    () => {
                        // Resetting window's offsetTop so as to display react-virtualized demo underfloor.
                        // In real scene, you can using public method of react-virtualized:
                        // https://stackoverflow.com/questions/46700726/how-to-use-public-method-updateposition-of-react-virtualized
                        window.dispatchEvent(new Event('resize'));
                    },
                );
            });
    };

    handleOk = () => {
        this.props.onOk(false, this.state.label, this.state.host, this.state.port, this.state.uname, this.state.passwd);
    };
    handleCancel = () => {
        this.props.onCancel(false);
    };

    render(){
        return (
            <>
                <Modal title="ssh列表" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Table dataSource={this.tableData}>
                        <Column title="host" dataIndex="host" />
                        <Column title="port" dataIndex="port" key="port" />
                        <Column title="uname" dataIndex="uname" key="uname" />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <a>连接</a>
                                    <a>删除</a>
                                </Space>
                            )}
                        />
                    </Table>
                </Modal>
            </>
        );
    }
};

export default ListSsh;
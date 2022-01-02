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
    id = '';
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
                    if(kk==="_id"){
                        this.id = docs[k][kk];
                    }
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
                    id: this.id,
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

    handleConn = (host, port, uname, passwd) => {
        this.props.onCancel(false);
        this.props.onConn(host, port, uname, passwd);
    };

    deleteArrayItem = (key,value) => {
        for (let i = 0; i < this.tableData.length; i++) {
            if(this.tableData[i][key]===value){
                this.tableData.splice(i, 1);
            }
        }
    }

    handleDel = (id) => {
        // 删除一条记录
        // options set to {} since the default for multi is false
        data_db.remove({ _id: id }, {}, (err, numRemoved) => {
            // numRemoved = 1
            if(numRemoved === 1){
                this.deleteArrayItem("id", id);
                this.handleCancel();
            }
        });
    };

    render(){
        return (
            <>
                <Modal title="ssh列表" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel} footer={null}>
                    <Table dataSource={this.tableData}>
                        <Column title="id" dataIndex="id" key="id" />
                        <Column title="host" dataIndex="host" key="host" />
                        <Column title="port" dataIndex="port" key="port" />
                        <Column title="uname" dataIndex="uname" key="uname" />
                        <Column
                            title="Action"
                            key="action"
                            render={(text, record) => (
                                <Space size="middle">
                                    <a onClick={() => {this.handleConn(record.host, record.port, record.uname, record.passwd)}}>连接</a>
                                    <a onClick={() => {this.handleDel(record.id)}}>删除</a>
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
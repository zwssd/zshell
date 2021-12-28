import React, {Component} from 'react';
import {Modal, Button, Tag, Input, InputNumber} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

class AddSsh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          label:'',
          host:'',
          port:'',
          uname:'',
          passwd:''
        };
    };

    onChangeL = (value) => {
        this.setState({label:value.target.value});
    };
    onChangeH = (value) => {
        this.setState({host:value.target.value});
    };
    onChangePort = (value) => {
        this.setState({port:value.target.value});
    };
    onChangeU = (value) => {
        this.setState({uname:value.target.value});
    };
    onChangePW = (value) => {
        this.setState({passwd:value.target.value});
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
                <Modal title="新增ssh" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Tag color="#2db7f5">标签</Tag>:<Input onChange={this.onChangeL} placeholder="标签" />
                    <Tag color="#2db7f5">主机</Tag>:<Input onChange={this.onChangeH} placeholder="主机" />
                    <Tag color="#2db7f5">端口</Tag>:<InputNumber  onChange={this.onChangePort} min={1}  max={65535} defaultValue={22} />
                    <Tag color="#2db7f5">用户</Tag>:<Input  onChange={this.onChangeU} placeholder="用户" />
                    <Tag color="#2db7f5">密码</Tag>:<Input.Password  onChange={this.onChangePW} placeholder="密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Modal>
            </>
        );
    }

};

export default AddSsh;
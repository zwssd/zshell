import React, {Component} from 'react';
import {Modal, Button, Tag, Input, InputNumber} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

class AddSsh extends Component {
    constructor(props) {
        super(props);
        this.state = {
          label:''
        };
    };

    onChange = (value) => {
        this.setState({label:value.target.value});
    };

    handleOk = () => {
        this.props.onOk(false, this.state.label);
    };
    handleCancel = () => {
        this.props.onCancel(false);
    };

    render(){
        return (
            <>
                <Modal title="新增ssh" visible={this.props.visible} onOk={this.handleOk} onCancel={this.handleCancel}>
                    <Tag color="#2db7f5">标签</Tag>:<Input onChange={this.onChange} placeholder="标签" />
                    <Tag color="#2db7f5">主机</Tag>:<Input placeholder="主机" />
                    <Tag color="#2db7f5">端口</Tag>:<InputNumber min={1}  max={65535} defaultValue={22} />
                    <Tag color="#2db7f5">用户</Tag>:<Input placeholder="用户" />
                    <Tag color="#2db7f5">密码</Tag>:<Input.Password placeholder="密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
                </Modal>
            </>
        );
    }

};

export default AddSsh;
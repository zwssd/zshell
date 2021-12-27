import React, { useState } from 'react';
import {Modal, Button, Tag, Input, InputNumber} from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const AddSsh = (visible, onOk, onCancel) => {

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Open Modal OK
            </Button>
            <Modal title="新增ssh" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <Tag color="#2db7f5">标签</Tag>:<Input placeholder="标签" />
                <Tag color="#2db7f5">主机</Tag>:<Input placeholder="主机" />
                <Tag color="#2db7f5">端口</Tag>:<InputNumber min={1}  max={65535} defaultValue={22} />
                <Tag color="#2db7f5">用户</Tag>:<Input placeholder="用户" />
                <Tag color="#2db7f5">密码</Tag>:<Input.Password placeholder="密码" iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)} />
            </Modal>
        </>
    );
};

export default AddSsh;
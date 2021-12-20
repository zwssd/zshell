import React, { useState } from 'react';
import { Button, Modal, Form, Input, InputNumber, Radio } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';

const AddSsh = ({ visible, onOk, onCancel, formData }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    let initValues = formData == undefined || formData.length == 0 ? {} :
        {
            label:formData.label,
            host:formData.host,
            port:formData.port,
            uname:formData.uname,
            passwd:formData.passwd,
        }
    //form.setFieldsValue(initValues)

    return (
        <Modal
            visible={visible}
            title="新增ssh"
            okText="创建"
            cancelText="取消"
            width={'50%'}
            destroyOnClose={true}
            onCancel={onCancel}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        form.setFieldsValue(values)
                        onOk(values);
                    })
                    .catch(info => {
                        console.log('校验失败:', info);
                    });
            }}
        >
            <Form
                form={form}
                {...layout}
                name="serverInfo"
                initialValues={initValues}
            >
                <Form.Item label="标签" name="label" rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]} >
                    <Input />
                </Form.Item>
                <Form.Item label="主机" name="host" rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="端口" name="port" rules={[
                    {
                        required: false,
                    },
                ]}>
                    <InputNumber defaultValue={'22'} />
                </Form.Item>
                <Form.Item label="用户" name="uname" rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="passwd" rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                    <Input.Password
                        placeholder="input password"
                        iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                    />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default AddSsh;
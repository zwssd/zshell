import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';

const AddSsh = ({ visible, submitMap, onCancel, currentDetailData }) => {
    const [form] = Form.useForm();
    const layout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };
    let initValues = currentDetailData == undefined || currentDetailData.length == 0 ? {} :
        {
            name:currentDetailData.name,
            crs:currentDetailData.crs,
        }

    form.setFieldsValue(initValues)
    return (
        <Modal
            visible={visible}
            title="新增ssh"
            okText="创建"
            cancelText="取消"
            onCancel={onCancel}
            width={'50%'}
            destroyOnClose={true}
            onOk={() => {
                form
                    .validateFields()
                    .then(values => {
                        form.resetFields();
                        form.setFieldsValue(values)
                        submitMap(values);
                    })
                    .catch(info => {
                        console.log('校验失败:', info);
                    });
            }}
        >
            <Form
                form={form}
                {...layout}
                name="serverDetail"
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
                <Form.Item label="用户" name="username" rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item label="密码" name="password" rules={[
                    {
                        required: true,
                        message: 'Please input the title of collection!',
                    },
                ]}>
                    <Input />
                </Form.Item>

            </Form>
        </Modal>
    );
};

export default AddSsh;
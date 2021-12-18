import { Modal, Button } from 'antd';
import React, { Component } from "react";
import AddSshForm from "./AddSshForm";

class AddSsh extends Component {
    constructor(props) {
        super(props);
        this.showModal = this.showModal.bind(this);
    }

    state = {
        loading: false,
        visible: false,
    };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false });
        }, 3000);
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    render() {
        const { visible, loading } = this.state;
        return (
            <>
                <Modal
                    visible={visible}
                    title="添加ssh"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    width={'50%'}
                    footer={null}
                >
                    <AddSshForm />
                </Modal>
            </>
        );
    }
}

export default AddSsh

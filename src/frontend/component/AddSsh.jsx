import { Modal, Button } from 'antd';
import React, { Component } from "react";

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
                <Button type="primary" onClick={this.showModal}>
                    Open Modal with customized footer
                </Button>
                <Modal
                    visible={visible}
                    title="Title"
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>
                            Return
                        </Button>,
                        <Button key="submit" type="primary" loading={loading} onClick={this.handleOk}>
                            Submit
                        </Button>,
                        <Button
                            key="link"
                            href="https://google.com"
                            type="primary"
                            loading={loading}
                            onClick={this.handleOk}
                        >
                            Search on Google
                        </Button>,
                    ]}
                >
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </>
        );
    }
}

export default AddSsh

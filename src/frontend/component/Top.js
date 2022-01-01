import React, {Component} from 'react';
import { Space } from 'antd';
import { PlusCircleTwoTone, DatabaseTwoTone, SettingTwoTone } from '@ant-design/icons';
import ListSsh from "./ListSsh";

class Top extends Component{
    constructor(props){
        super(props);
        this.state = {
            visible: false
        };
    };
    // 弹框显示状态、及当前需要展示的数据赋值
    changeListVisible = (status) =>{
        this.setState({
            visible:status
        })
    };

    changeVisibleTrue = () => {
        //console.log('changeVisibleTrue======');
        this.setState({
            visible: true,
        })
    };

    onOk = (status, label, host, port, uname, passwd) => {
        this.setState({
            visible:status,
        });
    };

    onConn = (host, port, uname, passwd) => {
      //console.log('onConn');
      //console.log(passwd);
      this.props.onConn(host, port, uname, passwd);
    };


    render() {
        return(
            <div className="TopApp">
                <ListSsh
                visible={this.state.visible}
                onOk={this.onOk}
                onCancel={() => {
                    this.changeListVisible(false);
                }}
                onConn={(host, port, uname, passwd) => {
                    this.onConn(host, port, uname, passwd);
                }}
                />
                <div className="icons-list">
                    <Space size={ 'large' }>
                        <PlusCircleTwoTone style={{ fontSize: '32px', cursor: 'pointer' }} onClick={this.props.onClick} />
                        <DatabaseTwoTone twoToneColor="#eb2f96" style={{ fontSize: '32px', cursor: 'pointer' }} onClick={ this.changeVisibleTrue } />
                        <SettingTwoTone twoToneColor="#52c41a" style={{ fontSize: '32px', cursor: 'pointer' }} />
                    </Space>
                </div>
            </div>
        );
    }
};

export default Top;

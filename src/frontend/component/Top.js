import React, {Component} from 'react';
import { Space } from 'antd';
import { PlusCircleTwoTone, DatabaseTwoTone, SettingTwoTone } from '@ant-design/icons';

class Top extends Component{
    constructor(props) {
        super(props);
        this.state = {
        };
    };
    render() {
        return(
            <div className="icons-list">
                <Space size={ 'large' }>
                    <PlusCircleTwoTone style={{ fontSize: '32px', cursor: 'pointer' }} onClick={this.props.onClick} />
                    <DatabaseTwoTone twoToneColor="#eb2f96" style={{ fontSize: '32px', cursor: 'pointer' }} />
                    <SettingTwoTone twoToneColor="#52c41a" style={{ fontSize: '32px', cursor: 'pointer' }} />
                </Space>
            </div>
        );
    }
};

export default Top;

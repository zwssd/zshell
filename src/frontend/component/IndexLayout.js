import "antd/dist/antd.css";
import "../App.css";
import React, { Component } from "react";
import Top from "./Top";
import CenterTabs from "./CenterTabs";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

class IndexLayout extends Component {
    onRef=(ref)=>{
        this.CenterTabs=ref;
    };
  render(){
    return (
      <Layout>
        <Header class={ 'ant-layout-headera' }><Top onClick={
            ()=>{
                this.CenterTabs.changeVisibleTrue&&this.CenterTabs.changeVisibleTrue()
            }
        } /></Header>
        <Content style={{ padding: '0 20px' }}>
            <CenterTabs onRef={this.onRef} />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default IndexLayout;
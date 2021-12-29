import "antd/dist/antd.css";
import "../App.css";
import React, { Component } from "react";
import Top from "./Top";
import CenterTabs from "./CenterTabs";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

class IndexLayout extends Component {
  render(){
    return (
      <Layout>
        <Header class={ 'ant-layout-headera' }><Top /></Header>
        <Content style={{ padding: '0 20px' }}>
            <CenterTabs />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default IndexLayout;
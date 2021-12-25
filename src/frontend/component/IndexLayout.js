import "antd/dist/antd.css";
import "../App.css";
import React, { Component } from "react";
import CenterTabs from "./CenterTabs";
import { Layout } from 'antd';
const { Header, Footer, Content } = Layout;

class IndexLayout extends Component {
  render(){
    return (
      <Layout>
        <Header>Header</Header>
        <Content style={{ padding: '0 20px' }}>
            <CenterTabs />
        </Content>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default IndexLayout;
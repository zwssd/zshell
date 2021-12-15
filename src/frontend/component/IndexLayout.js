import "antd/dist/antd.css";
import "../App.css";
import SiderTree from "./SiderTree";
import NetWorkConfig from "./NetWorkConfig";
import React, { Component } from "react";
import { Layout,Button } from 'antd';
const { Header, Footer, Sider, Content } = Layout;

class IndexLayout extends Component {
  render(){
    return (
      <Layout>
        <Header>Header</Header>
        <Layout>
          <Sider><SiderTree /></Sider>
          <Content>
            <div className="App">
              <NetWorkConfig />
              </div>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default IndexLayout;
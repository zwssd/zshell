import "antd/dist/antd.css";
import "../App.css";
import React, { Component } from "react";
import SiderTree from "./SiderTree";
import RightTabs from "./RightTabs";
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
              <RightTabs />
              </div>
          </Content>
        </Layout>
        <Footer>Footer</Footer>
      </Layout>
    );
  }
}

export default IndexLayout;
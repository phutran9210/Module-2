import React, { useEffect } from "react";
import {
  MenuFoldOutlined,
  PayCircleOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { useState } from "react";
const { Header, Sider, Content } = Layout;
import UserTable from "./user";
import VideoTable from "./managerVideos";
const AdminPage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [currentComponent, setCurrentComponent] = useState("user");
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["user"]}
          onClick={({ key }) => {
            setCurrentComponent(key);
          }}
          items={[
            {
              key: "user",
              icon: <UserOutlined />,
              label: "User",
            },
            {
              key: "managerMovies",
              icon: <VideoCameraOutlined />,
              label: "Movies",
            },
            {
              key: "store",
              icon: <PayCircleOutlined />,
              label: "Store",
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100vh",
            background: colorBgContainer,
          }}
        >
          {currentComponent === "user" && <UserTable />}
          {currentComponent === "managerMovies" && <VideoTable />}
        </Content>
      </Layout>
    </Layout>
  );
};
export default AdminPage;

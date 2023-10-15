"use client";
import { useState } from "react";
import { Layout, Menu } from "antd";

const { Sider } = Layout;

import { getUserInfo } from "@/services/auth.service";
import { sidebarItems } from "@/constants/SidebarItems";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  // const role = USER_ROLE.ADMIN;
  const { role } = getUserInfo() as any;

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      width={280}
      style={{
        overflow: "auto",
        height: "100vh",
        position: "sticky",
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="demo-logo-vertical" />
      <div
        style={{
          color: "white",
          fontSize: "2rem",
          textAlign: "center",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        IS
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={["1"]}
        mode="inline"
        items={sidebarItems(role)}
      />
    </Sider>
  );
};

export default Sidebar;

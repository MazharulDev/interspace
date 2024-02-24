import { ArrowLeftOutlined } from "@ant-design/icons";
import { Layout, Row } from "antd";
import Link from "next/link";

const { Header: AntHeader } = Layout;

const AuthNavbar = () => {
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="start"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <Link href="/">
          <ArrowLeftOutlined />
          Home
        </Link>
      </Row>
    </AntHeader>
  );
};

export default AuthNavbar;

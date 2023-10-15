"use client";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BreadCrumb from "../ui/Breadcrumb";
import Link from "next/link";

const Profile = () => {
  const { userId, role } = getUserInfo() as any;
  const { data } = useUserQuery(userId);
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BreadCrumb
          items={[
            {
              label: `profile-${role}`,
              link: `/profile`,
            },
          ]}
        />
        <Link href={`/profile/${role}-edit`}>
          <Button style={{ margin: "10px 20px" }}>Edit</Button>
        </Link>
      </div>
      <Row justify="center" align="middle" style={{ marginTop: "2rem" }}>
        <Space wrap size={16}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Space>
      </Row>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        {role === "user" ? (
          <h2>{data?.user?.name}</h2>
        ) : (
          <h2>{data?.admin?.name}</h2>
        )}
        <h3 style={{ margin: "1rem 0" }}>{userId}</h3>
        {role === "user" ? (
          <p>Phone Number: {data?.user?.phoneNumber}</p>
        ) : (
          <p>Phone Number: {data?.admin?.phoneNumber}</p>
        )}
      </div>
    </>
  );
};

export default Profile;

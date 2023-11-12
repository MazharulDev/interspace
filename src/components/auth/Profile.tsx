"use client";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BreadCrumb from "../ui/Breadcrumb";
import Image from "next/image";

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
      </div>
      <Row justify="center" align="middle" style={{ marginTop: "2rem" }}>
        <Space wrap size={16}>
          {role === "user" ? (
            <div>
              {data?.user?.image ? (
                <Image
                  width={100}
                  height={100}
                  src={data?.user?.image}
                  alt="avatar"
                  style={{ width: "100%", borderRadius: "50%" }}
                />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}
            </div>
          ) : (
            <div>
              {data?.admin?.image ? (
                <Image
                  width={100}
                  height={100}
                  src={data?.admin?.image}
                  alt="avatar"
                  style={{ width: "100%", borderRadius: "50%" }}
                />
              ) : (
                <Avatar size={64} icon={<UserOutlined />} />
              )}
            </div>
          )}
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

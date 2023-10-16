"use client";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useUserByIdQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Row, Space } from "antd";

type IDProps = {
  params: any;
};

const UserViewPage = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data } = useUserByIdQuery(id);
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
              label: `${role}`,
              link: `/${role}`,
            },
            {
              label: "user",
              link: `/${role}/user`,
            },
            {
              label: "view",
              link: `/${role}/user/view`,
            },
          ]}
        />
      </div>
      <Row justify="center" align="middle" style={{ marginTop: "2rem" }}>
        <Space wrap size={16}>
          <Avatar size={64} icon={<UserOutlined />} />
        </Space>
      </Row>
      <div style={{ textAlign: "center", margin: "2rem 0" }}>
        <h2>{data?.name}</h2>

        <h3 style={{ margin: "1rem 0" }}>{data?.email}</h3>

        <p>Phone Number: {data?.phoneNumber}</p>
      </div>
    </>
  );
};

export default UserViewPage;

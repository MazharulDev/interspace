"use client";
import BreadCrumb from "@/components/ui/Breadcrumb";
import ViewProfile from "@/components/ui/ViewProfile";
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
      <div>
        <ViewProfile data={data} role={data?.role} />
      </div>
    </>
  );
};

export default UserViewPage;

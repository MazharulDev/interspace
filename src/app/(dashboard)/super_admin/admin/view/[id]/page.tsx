"use client";
import BreadCrumb from "@/components/ui/Breadcrumb";
import ViewProfile from "@/components/ui/ViewProfile";
import { useAdminQuery } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import { UserOutlined } from "@ant-design/icons";
import { Avatar, Row, Space } from "antd";

type IDProps = {
  params: any;
};

const AdminViewPage = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data } = useAdminQuery(id);
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
              label: "admins",
              link: `/${role}/admin`,
            },
            {
              label: "view",
              link: `/${role}/admin/view`,
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

export default AdminViewPage;

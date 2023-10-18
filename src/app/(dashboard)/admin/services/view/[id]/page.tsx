"use client";
import ServiceCardAdmin from "@/components/card/ServiceCardViewAdmin";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useServiceByIdQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Row } from "antd";
type IDProps = {
  params: any;
};

const ViewService = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data, isLoading } = useServiceByIdQuery(id);
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "services",
            link: `/${role}/services`,
          },
          {
            label: "view",
            link: `/${role}/services/view`,
          },
        ]}
      />
      <div>
        <Row justify="center" align="middle" style={{ padding: "5rem 0" }}>
          <ServiceCardAdmin
            packageName={data?.title}
            price={data?.price}
            mb={data?.speed}
          />
        </Row>
      </div>
    </div>
  );
};

export default ViewService;

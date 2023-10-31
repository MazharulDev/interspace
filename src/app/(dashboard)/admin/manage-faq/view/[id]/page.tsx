"use client";
import ServiceCardAdmin from "@/components/card/ServiceCardViewAdmin";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useFaqByIdQuery } from "@/redux/api/faqApi";
import { useServiceByIdQuery } from "@/redux/api/serviceApi";
import { getUserInfo } from "@/services/auth.service";
import { Col, Collapse, Row } from "antd";
type IDProps = {
  params: any;
};

const ViewFaq = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data } = useFaqByIdQuery(id);
  const generateItemsFromData = (data: any) => [
    {
      key: "1",
      label: data?.question,
      children: <p>{data?.answer}</p>,
    },
  ];

  const items = generateItemsFromData(data);
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "manage-faq",
            link: `/${role}/manage-faq`,
          },
          {
            label: "view",
            link: `/${role}/manage-faq/view`,
          },
        ]}
      />
      <div>
        <Row justify="center" align="middle" style={{ padding: "5rem 0" }}>
          <Col lg={16}>
            <Collapse items={items} />
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ViewFaq;

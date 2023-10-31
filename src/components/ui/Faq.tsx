"use client";
import { useFaqsQuery } from "@/redux/api/faqApi";
import { Col, Collapse, Row } from "antd";

const FaqSection = () => {
  const { data } = useFaqsQuery(undefined);

  const generateItemsFromData = (data: any) => {
    return data?.map((item: any, index: string) => ({
      key: (index + 1).toString(),
      label: item?.question,
      children: <p>{item?.answer}</p>,
    }));
  };

  const items = generateItemsFromData(data);

  return (
    <div style={{ margin: "5rem" }}>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>FAQ</h1>
      <Row justify="center" align="middle">
        <Col lg={16}>
          <Collapse items={items} />
        </Col>
      </Row>
    </div>
  );
};

export default FaqSection;

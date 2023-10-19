"use client";

import { useAllSectionFaqQuery } from "@/redux/api/faqSectionApi";
import { Col, Collapse, CollapseProps, Row } from "antd";

const text = "This is answer";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
  },
];

const FaqSection = () => {
  const { data } = useAllSectionFaqQuery({});
  console.log(data);
  return (
    <div style={{ margin: "5rem" }}>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>FAQ</h1>
      <Row justify="center" align="middle">
        <Col lg={16}>
          <Collapse items={items} />;
        </Col>
      </Row>
    </div>
  );
};

export default FaqSection;

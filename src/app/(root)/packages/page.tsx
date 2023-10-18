"use client";
import ServiceCard from "@/components/card/ServiceCard";
import { useServicesQuery } from "@/redux/api/serviceApi";
import { Col, Row, Space, Spin } from "antd";

const PackagesPage = () => {
  const { data, isLoading } = useServicesQuery({});
  if (isLoading) {
    return (
      <Row
        justify="center"
        align="middle"
        style={{
          height: "100vh",
        }}
      >
        <Space>
          <Spin tip="Loading" size="large"></Spin>
        </Space>
      </Row>
    );
  }
  return (
    <div>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
        Our All Services
      </h1>
      <div style={{ margin: "0 2rem" }}>
        <Row justify="center" align="middle" style={{ padding: "5rem 0" }}>
          {data?.services?.map((service) => (
            <Col key={service._id} sm={12} md={16} lg={6}>
              <div>
                <ServiceCard
                  packageName={service?.title}
                  price={service?.price}
                  mb={service?.speed}
                  id={service?._id}
                />
              </div>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PackagesPage;

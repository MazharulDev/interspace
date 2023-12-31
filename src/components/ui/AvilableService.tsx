"use client";
import { Button, Col, Row, Space, Spin } from "antd";
import ServiceCard from "../card/ServiceCard";
import { useServicesQuery } from "@/redux/api/serviceApi";
import Link from "next/link";

const AvilableService = () => {
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
    <div style={{ backgroundColor: "white", padding: "15px 0" }}>
      <div style={{ textAlign: "center" }}>
        <h1>Discover The Best Deals for Your Entertainment</h1>
        <p style={{ margin: "10px 0", color: "GrayText", fontSize: "20px" }}>
          Exclusive Deals for You Internet & Entertainment
        </p>
      </div>
      <div>
        <Row justify="center" align="middle" style={{ padding: "5rem 0" }}>
          {data?.services?.slice(0, 3)?.map((service) => (
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Link href="/packages">
          <Button type="primary" size="large">
            View all services
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default AvilableService;

"use client";
import { Button, Col, Row, Space, Spin } from "antd";
import ServiceCard from "../card/ServiceCard";
import { useServicesQuery } from "@/redux/api/serviceApi";
import Link from "next/link";
import ButtonMain from "./Button";

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
    <div className="max-w-[1200px] mx-auto min-h-[600px] relative overflow-hidden mb-20">
      <div className="text-center mb-10">
        <h1 className="text-3xl primary-text font-bold">
          Discover The Best Deals for Your Entertainment
        </h1>
        <p className="text-base mt-2">
          Exclusive Deals for You Internet & Entertainment
        </p>
      </div>
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center items-center gap-6">
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
        </div>
      </div>
      <div className="flex justify-center">
        <Link href="/packages">
          <ButtonMain>View all services</ButtonMain>
        </Link>
      </div>
    </div>
  );
};

export default AvilableService;

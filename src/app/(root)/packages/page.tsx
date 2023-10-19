"use client";
import ServiceCard from "@/components/card/ServiceCard";
import {
  useServiceSearchQuery,
  useServicesQuery,
} from "@/redux/api/serviceApi";
import { useDebounced } from "@/redux/hooks";
import { IService } from "@/types";
import {
  Button,
  Col,
  Input,
  InputNumber,
  Row,
  Select,
  Slider,
  Space,
  Spin,
} from "antd";
import { useState } from "react";

const PackagesPage = () => {
  const query: Record<string, any> = {};
  const [searchResult, setSearchResult] = useState<string>("");
  const [packageSelect, setPackageSelect] = useState<string>();
  const [speed, setSpeed] = useState<number>(10);

  const debouncedSearchTerm = useDebounced({
    searchQuery: searchResult,
    delay: 600,
  });

  if (!!debouncedSearchTerm) {
    query["searchTerm"] = debouncedSearchTerm;
  }
  const handleFilter = () => {
    query["title"] = packageSelect;
    // console.log(packageSelect);
    // query["speed"] = speed;
  };

  const onMbChange = (newValue: number) => {
    setSpeed(newValue);
  };
  const handlePackageChange = (value: string) => {
    setPackageSelect(value);
  };
  const { data, isLoading } = useServicesQuery({ ...query });

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
  //@ts-ignore
  const services: IService[] = data?.services;
  const departmentOptions =
    services &&
    services?.map((service) => {
      return {
        label: service?.title,
        value: service?.title,
      };
    });

  return (
    <div>
      <div style={{ margin: "0 2rem" }}>
        <Row justify="space-around" style={{ padding: "5rem 0" }}>
          <Col sm={12} md={16} lg={4}>
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
              Filter
            </h1>
            <label>Package Name</label>
            <Input
              size="large"
              placeholder="Search"
              onChange={(e) => setSearchResult(e.target.value)}
              style={{
                marginTop: "5px",
                marginBottom: "10px",
              }}
            />
            <label>Package Name</label>
            <Select
              style={{ width: "100%", marginTop: "5px", marginBottom: "10px" }}
              options={departmentOptions}
              placeholder="Select package"
              onChange={handlePackageChange}
            />
            <label>Package Name</label>
            <InputNumber
              min={1}
              max={20}
              style={{ margin: "0 16px" }}
              value={speed}
            />
            <Slider
              min={1}
              max={20}
              onChange={onMbChange}
              value={typeof speed === "number" ? speed : 0}
              style={{ width: "100%", marginTop: "5px", marginBottom: "10px" }}
            />
            <Button onClick={handleFilter}>Filter</Button>
          </Col>

          <Col sm={12} md={16} lg={18}>
            <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
              Service
            </h1>
            <Row justify="center">
              {data?.services?.map((service) => (
                <Col key={service._id} sm={12} md={12} lg={8}>
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
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default PackagesPage;

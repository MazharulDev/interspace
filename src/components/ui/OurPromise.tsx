import { Col, Row } from "antd";
import homeInternetImg from "@/assets/home-internet-icon.png";
import corporateInternetImg from "@/assets/corporate-internet-icon.png";
import dataConnectivityImg from "@/assets/data-connectivity-icon.png";
import PromiseCard from "../card/PromiseCard";

const OurPromise = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{ padding: "5rem 0", backgroundColor: "white" }}
    >
      <Col sm={12} md={16} lg={6}>
        <PromiseCard
          img={homeInternetImg}
          title={"Home Internet"}
          text1={"Bufferless Steaming"}
          text2={"Lag Free Gaming"}
          text3={"Real IP Included"}
          text4={"Stable Connection With No Interruptions"}
        />
      </Col>
      <Col sm={12} md={16} lg={6}>
        <PromiseCard
          img={corporateInternetImg}
          title={"Corporate Internet"}
          text1={"Dedicated Network"}
          text2={"Business-friendly SLAs"}
          text3={"24×7 Support"}
          text4={"Flexible & Scalable internet Bandwidth"}
        />
      </Col>
      <Col sm={12} md={16} lg={6}>
        <PromiseCard
          img={dataConnectivityImg}
          title={"Data Connectivity"}
          text1={"Optimal Performance"}
          text2={"World Class Reliability"}
          text3={"Optical Fiber Network"}
          text4={"Symmetrical Upload & Download Speeds"}
        />
      </Col>
    </Row>
  );
};

export default OurPromise;

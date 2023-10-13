import { Button, Col, Row } from "antd";
import Image from "next/image";
import BannerImg from "@/assets/banner.png";

const Banner = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={8} lg={11}>
        <h1
          style={{
            margin: "15px 0px",
            fontSize: "3rem",
          }}
        >
          Interspace Services Ltd.
        </h1>

        <p style={{ width: "90%", margin: "20px 0", fontSize: "20px" }}>
          Best internet service provider in Bangladesh which provides fully
          dedicated, super fast, cost-effective, secured internet connection.
          We’re promised to meeting your needs and delivering industry-leading
          customer service.
        </p>
        <Button size="large">Get Started Now</Button>
      </Col>
      <Col sm={12} md={16} lg={8}>
        <Image src={BannerImg} width={500} alt="login image" />
      </Col>
    </Row>
  );
};

export default Banner;

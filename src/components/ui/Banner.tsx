import { Button, Col, Row } from "antd";
import Image from "next/image";
import BannerImg from "@/assets/banner.png";
import Link from "next/link";

const Banner = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
        backgroundColor: "#335963",
        color: "white",
      }}
    >
      <Col sm={12} md={8} lg={11} style={{ padding: "0 15px" }}>
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
        <Link href="/packages">
          <Button size="large">Get Started Now</Button>
        </Link>
      </Col>
      <Col sm={6} md={10} lg={8}>
        <Image src={BannerImg} width={380} alt="login image" />
      </Col>
    </Row>
  );
};

export default Banner;

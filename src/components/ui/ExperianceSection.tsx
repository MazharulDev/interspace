import ExperianceImg from "@/assets/Online-bro.png";
import { Button, Col, Row } from "antd";
import Image from "next/image";

const ExperianceSection = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={10} lg={10}>
        <Image src={ExperianceImg} width={380} alt="login image" />
      </Col>

      <Col sm={12} md={8} lg={10} style={{ padding: "0 15px" }}>
        <h1
          style={{
            margin: "15px 0px",
            fontSize: "2rem",
          }}
        >
          Reliable, Safe, Fast High speed broadband internet connection from
          Interspace Services Ltd.
        </h1>
        <div>
          <p style={{ width: "90%", margin: "20px 0", fontSize: "20px" }}>
            Interspace changes your lifestyle and letting you focus on the
            growth of your business by providing superfast broadband internet
            service.
          </p>
          <Button size="large">Experiance Now</Button>
        </div>
      </Col>
    </Row>
  );
};

export default ExperianceSection;

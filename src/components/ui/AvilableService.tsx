import { Col, Row } from "antd";
import SaverTextImg from "@/assets/saverText.png";
import familyTextImg from "@/assets/familyText.png";
import gamerTextImg from "@/assets/gamerText.png";
import ServiceCard from "../card/ServiceCard";

const AvilableService = () => {
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
          <Col sm={12} md={16} lg={6}>
            <div>
              <ServiceCard
                img={SaverTextImg}
                price={"14,99"}
                mb={"25"}
                text1={"Real IP"}
                text2={"Optical Fiber"}
                text3={"Public IP"}
              />
            </div>
          </Col>
          <Col sm={12} md={16} lg={6}>
            <div>
              <ServiceCard
                img={familyTextImg}
                price={"14,99"}
                mb={"25"}
                text1={"Real IP"}
                text2={"Optical Fiber"}
                text3={"Public IP"}
              />
            </div>
          </Col>
          <Col sm={12} md={16} lg={6}>
            <div>
              <ServiceCard
                img={gamerTextImg}
                price={"14,99"}
                mb={"25"}
                text1={"Real IP"}
                text2={"Optical Fiber"}
                text3={"Public IP"}
              />
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default AvilableService;

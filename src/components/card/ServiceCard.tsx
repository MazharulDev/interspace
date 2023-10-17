import { Button, Card, Divider } from "antd";
import { GiftOutlined } from "@ant-design/icons";

const ServiceCard = ({ packageName, price, mb, text1, text2, text3 }: any) => {
  return (
    <Card
      hoverable
      style={{
        width: 300,
        background: "linear-gradient(to right, #173985,#556485)",
        color: "white",
      }}
    >
      <h2 style={{ fontFamily: "Kalam", fontSize: "3rem" }}>{packageName}</h2>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          gap: "1rem",
          margin: "15px 0",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>{price}</h1>
        <p style={{ marginBottom: "1rem" }}>TK/Month</p>
      </div>
      <Divider style={{ background: "white" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1 style={{ fontSize: "5rem" }}>{mb}</h1>
        <p style={{ fontSize: "2rem", marginTop: "1rem" }}>Mbps</p>
      </div>
      <div>
        <h2>Exclusive Privileges</h2>
        <div
          style={{
            display: "flex",
            alignItems: "start",
            gap: "10px",
            marginTop: "1rem",
          }}
        >
          <GiftOutlined style={{ marginTop: "3px" }} />
          <p>No Security Deposit Required (for any package)</p>
        </div>
        {/* <h3>{text1}</h3>
        <h3>{text2}</h3>
        <h3>{text3}</h3> */}
      </div>
      <Button style={{ margin: "2rem 0" }}>Get It Now</Button>
    </Card>
  );
};

export default ServiceCard;

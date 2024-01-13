import { Button, Divider } from "antd";
import { GiftOutlined } from "@ant-design/icons";
import Link from "next/link";

const ServiceCard = ({ packageName, price, mb, id }: any) => {
  return (
    <div className="w-96 bg-white shadow-xl hover:scale-105  p-5 rounded-lg duration-100">
      <h2 className="font-bold text-4xl primary-text font-[Lemon]">
        {packageName}
      </h2>
      <div
        style={{
          display: "flex",
          alignItems: "end",
          gap: "1rem",
          margin: "15px 0",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>
          {price?.toString()?.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
        </h1>
        <p style={{ marginBottom: "1rem" }}>TK/Month</p>
      </div>
      <Divider style={{ background: "white" }} />
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <h1 className="text-5xl primary-text">{mb}</h1>
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
      </div>
      <Link href={`/booking/${id}`}>
        <Button style={{ margin: "2rem 0" }}>Get It Now</Button>
      </Link>
    </div>
  );
};

export default ServiceCard;

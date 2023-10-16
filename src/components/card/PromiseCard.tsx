import Image from "next/image";
import { CheckOutlined } from "@ant-design/icons";
import { Divider } from "antd";

const PromiseCard = ({ img, title, text1, text2, text3, text4 }: any) => {
  return (
    <div style={{ display: "flex", gap: "20px", padding: "5px" }}>
      <Image src={img} width={80} height={80} alt="Home internet" />
      <div>
        <h1 style={{ margin: "8px 0" }}>{title}</h1>

        <div>
          <div
            style={{
              display: "flex",
              fontSize: "1rem",
              gap: "5px",
            }}
          >
            <CheckOutlined style={{ color: "green" }} />
            <p>{text1}</p>
          </div>
        </div>

        <div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              margin: "5px 0",
              fontSize: "1rem",
            }}
          >
            <CheckOutlined style={{ color: "green" }} />
            <p>{text2}</p>
          </div>
        </div>
        <div>
          <div style={{ display: "flex", gap: "5px", fontSize: "1rem" }}>
            <CheckOutlined style={{ color: "green" }} />
            <p>{text3}</p>
          </div>
        </div>
        <div>
          <div
            style={{
              display: "flex",
              gap: "5px",
              margin: "5px 0",
              fontSize: "1rem",
            }}
          >
            <CheckOutlined style={{ color: "green" }} />
            <p>{text4}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseCard;

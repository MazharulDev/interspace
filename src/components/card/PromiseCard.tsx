import Image from "next/image";
import { CheckOutlined } from "@ant-design/icons";

const PromiseCard = ({ img, title, text1, text2, text3, text4 }: any) => {
  return (
    <div className="flex justify-start items-center gap-5 border-r-0 md:border-r-2 last:border-r-0">
      <Image src={img} width={120} height={120} alt="Home internet" />
      <div>
        <h1 className="text-2xl mb-4">{title}</h1>

        <div>
          <div className="flex justify-start items-center gap-3">
            <CheckOutlined style={{ color: "green" }} />
            <p>{text1}</p>
          </div>
        </div>

        <div>
          <div className="flex justify-start items-center gap-3">
            <CheckOutlined style={{ color: "green" }} />
            <p>{text2}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-start items-center gap-3">
            <CheckOutlined style={{ color: "green" }} />
            <p>{text3}</p>
          </div>
        </div>
        <div>
          <div className="flex justify-start items-center gap-3">
            <CheckOutlined style={{ color: "green" }} />
            <p>{text4}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromiseCard;

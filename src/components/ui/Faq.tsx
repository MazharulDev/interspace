"use client";
import { useFaqsQuery } from "@/redux/api/faqApi";
import { Col, Collapse, Row } from "antd";

const FaqSection = () => {
  const { data } = useFaqsQuery(undefined);

  const generateItemsFromData = (data: any) => {
    return data?.map((item: any, index: string) => ({
      key: (index + 1).toString(),
      label: item?.question,
      children: <p>{item?.answer}</p>,
    }));
  };

  const items = generateItemsFromData(data);

  return (
    <div className="mb-20 max-w-[1200px] overflow-hidden mx-auto px-5 lg:px-0 mt-14 md:mt-16 lg:mt-24">
      <h1 className="text-center text-4xl primary-text my-10 font-bold">FAQ</h1>
      <div className="flex justify-center items-center">
        <div className="w-full">
          <Collapse items={items} />
        </div>
      </div>
    </div>
  );
};

export default FaqSection;

"use client";
import { useUserReviewByIdQuery } from "@/redux/api/userReviewApi";
import { Col, Divider, Row } from "antd";
import Image from "next/image";
import quoteImg from "@/assets/quote.png";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { getUserInfo } from "@/services/auth.service";

type IPrams = {
  params: any;
};
const ReviewShowPage = ({ params }: IPrams) => {
  const { role } = getUserInfo() as any;
  const { data } = useUserReviewByIdQuery(params?.id);
  console.log(data);
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "manage-review",
            link: `/${role}/manage-review`,
          },
        ]}
      />
      <Row justify="center" align="middle">
        <Col sm={12} md={16} lg={6}>
          <div
            style={{
              width: "20rem",
              backgroundColor: "white",
              padding: "2rem",
              borderRadius: "1rem",
              height: "22rem",
            }}
          >
            <div>
              <Image
                src={quoteImg}
                width={100}
                height={100}
                alt="Quote image"
              />
            </div>
            <p style={{ margin: "2rem 0" }}>{data?.text}</p>
            <Divider orientation="right">{data?.name}</Divider>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ReviewShowPage;

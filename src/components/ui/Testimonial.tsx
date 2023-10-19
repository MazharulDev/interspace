"use client";
import { Col, Divider, Row } from "antd";
import quoteImg from "@/assets/quote.png";
import Image from "next/image";
import { usePublishReviewQuery } from "@/redux/api/userReviewApi";

const Testimonial = () => {
  const { data } = usePublishReviewQuery(undefined);
  return (
    <div style={{ margin: "3rem 0" }}>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>Client Reviews</h1>

      <Row justify="center" align="middle">
        {data?.slice(0, 3)?.map((review: any) => (
          <>
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
                <p style={{ margin: "2rem 0" }}>{review?.text}</p>
                <Divider orientation="right">{review?.name}</Divider>
              </div>
            </Col>
          </>
        ))}
      </Row>
    </div>
  );
};

export default Testimonial;

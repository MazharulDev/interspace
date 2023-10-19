import { Col, Row } from "antd";
import { MessageOutlined } from "@ant-design/icons";

const ViewReview = ({ reviewData }: any) => {
  return (
    <div style={{ margin: "2rem" }}>
      <Row justify="center" align="middle">
        {reviewData?.map((review: any) => (
          <>
            <Col sm={12} md={8} lg={16}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1rem",
                }}
              >
                <div>
                  <MessageOutlined />
                </div>
                <div>
                  <h3>{review?.author?.name}</h3>
                  <p>{review?.text}</p>
                </div>
              </div>
            </Col>
          </>
        ))}
      </Row>
    </div>
  );
};

export default ViewReview;

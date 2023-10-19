"use client";

import { Button, Col, Row, message } from "antd";
import Form from "../forms/Form";
import { SubmitHandler } from "react-hook-form";
import FormTextArea from "../forms/FormTextArea";
import { getUserInfo } from "@/services/auth.service";
import { useUserQuery } from "@/redux/api/userApi";
import { useCreateUserReviewMutation } from "@/redux/api/userReviewApi";

type FormValues = {
  name: string;
  review: string;
};

const UserReview = () => {
  const { userId } = getUserInfo() as any;
  const { data } = useUserQuery(userId);
  const defaultValue = {
    name: data?.user?.name || "",
  };
  const [createUserReview] = useCreateUserReviewMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const res = await createUserReview({ ...data }).unwrap();
    if (res?._id) {
      message.success("Thank your for your valuable review");
    }
  };
  return (
    <div style={{ margin: "5rem 0" }}>
      <h1 style={{ textAlign: "center", margin: "2rem 0" }}>
        Your valuable Review
      </h1>
      <Row justify="center" align="middle">
        <Col lg={12}>
          <Form submitHandler={onSubmit} defaultValues={defaultValue}>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormTextArea
                name="text"
                placeholder="Write your valuable Review"
                label="Review"
                rows={10}
              />
            </div>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default UserReview;

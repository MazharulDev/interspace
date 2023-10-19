"use client";
import { Button, Row, message } from "antd";
import FormInput from "../forms/FormInput";
import FormTextArea from "../forms/FormTextArea";
import Form from "../forms/Form";
import { SubmitHandler } from "react-hook-form";
import { getUserInfo } from "@/services/auth.service";
import { useUserQuery } from "@/redux/api/userApi";
import { useCreateReviewMutation } from "@/redux/api/reviewApi";

type FormValues = {
  text: string;
};
type IProps = {
  id: string;
};

const ReviewSection = ({ id }: IProps) => {
  const { userId } = getUserInfo() as any;
  const { data: userInfo } = useUserQuery(userId);
  const [createReview] = useCreateReviewMutation();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    const reviewData = {
      text: data.text,
      author: userInfo?.user?.id,
      serviceId: id,
    };
    const res = await createReview({ ...reviewData }).unwrap();
    if (res?._id) {
      message.success("Add review successfully");
    }
  };
  return (
    <Row justify="center" align="middle">
      <Form submitHandler={onSubmit}>
        <div>
          <FormTextArea name="text" label="Review" placeholder="Enter review" />
        </div>
        <Button type="primary" htmlType="submit" style={{ margin: "10px 0" }}>
          Submit
        </Button>
      </Form>
    </Row>
  );
};

export default ReviewSection;

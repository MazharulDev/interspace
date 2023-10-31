"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useFaqByIdQuery, useUpdateFaqMutation } from "@/redux/api/faqApi";

import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
  params: any;
};

const FaqUpdate = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data } = useFaqByIdQuery(id);

  const [updateFaq] = useUpdateFaqMutation();
  const router = useRouter();

  const defaultValue = {
    question: data?.question || "",
    answer: data?.answer || "",
  };
  const onSubmit = async (values: any) => {
    try {
      const res = await updateFaq({ id, body: values }).unwrap();
      if (res?._id) {
        message.success("FAQ Updated Successfully");
        router.push(`/${role}/manage-faq`);
      }
    } catch (err: any) {
      console.error(err.message);
    }
  };
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "manage-faq",
            link: `/${role}/manage-faq`,
          },
          {
            label: "update",
            link: `/${role}/manage-faq/edit`,
          },
        ]}
      />

      <h1>Update FAQ</h1>
      <Form submitHandler={onSubmit} defaultValues={defaultValue}>
        <div
          style={{
            border: "1px solid #d9d9d9",
            borderRadius: "5px",
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <p
            style={{
              fontSize: "18px",
              marginBottom: "10px",
            }}
          >
            FAQ Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="question"
                size="large"
                label="Question"
                defaultValue={data?.question}
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="answer"
                size="large"
                label="Answer"
                defaultValue={data?.answer}
              />
            </Col>
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          update
        </Button>
      </Form>
    </div>
  );
};

export default FaqUpdate;

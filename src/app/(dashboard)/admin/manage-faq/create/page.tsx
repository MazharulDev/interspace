"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useCreatefaqMutation } from "@/redux/api/faqApi";
import { faqSchema } from "@/schemas/faq";

import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const FaqCreatePage = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const [createfaq] = useCreatefaqMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await createfaq(values).unwrap();
      if (res?._id) {
        message.success("Faq created successfully!");
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
            label: "create",
            link: `/${role}/manage-faq/create`,
          },
        ]}
      />

      <h1>Create FAQ</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(faqSchema)}>
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
            FAQ Field
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
              />
            </Col>
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          create
        </Button>
      </Form>
    </div>
  );
};

export default FaqCreatePage;

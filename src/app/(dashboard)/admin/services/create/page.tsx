"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useCreateServiceMutation } from "@/redux/api/serviceApi";
import { serviceSchema } from "@/schemas/service";

import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const ServiceCreatePage = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const [createService] = useCreateServiceMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await createService(values).unwrap();
      if (res?._id) {
        message.success("Package created successfully!");
        router.push(`/${role}/services`);
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
            label: "services",
            link: `/${role}/services`,
          },
          {
            label: "create",
            link: `/${role}/services/create`,
          },
        ]}
      />

      <h1 className="text-4xl font-bold my-4">Create Service</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(serviceSchema)}>
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
            Service Information
          </p>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={24}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="title"
                size="large"
                label="Package Title"
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
                name="price"
                size="large"
                label="Price/month"
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
                name="speed"
                size="large"
                label="Speed/mbps"
              />
            </Col>
          </Row>
        </div>

        <Button className="bg-blue-500" type="primary" htmlType="submit">
          Create
        </Button>
      </Form>
    </div>
  );
};

export default ServiceCreatePage;

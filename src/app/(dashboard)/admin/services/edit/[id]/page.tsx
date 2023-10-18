"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/Breadcrumb";
import {
  useServiceByIdQuery,
  useUpdateServiceMutation,
} from "@/redux/api/serviceApi";

import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
  params: any;
};

const ServiceUpdate = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data } = useServiceByIdQuery(id);

  const [updateService] = useUpdateServiceMutation();
  const router = useRouter();

  const defaultValue = {
    title: data?.title || "",
    price: data?.price || "",
    speed: data?.speed || "",
  };
  const onSubmit = async (values: any) => {
    try {
      const res = await updateService({ id, body: values }).unwrap();
      if (res?._id) {
        message.success("Service Updated Successfully");
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
            label: "update",
            link: `/${role}/services/edit`,
          },
        ]}
      />

      <h1>Update Service</h1>
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
            User Information
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
                defaultValue={data?.title}
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
                defaultValue={data?.price}
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
                defaultValue={data?.speed}
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

export default ServiceUpdate;

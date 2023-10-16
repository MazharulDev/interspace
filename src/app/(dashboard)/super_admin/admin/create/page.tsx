"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useCreateAdminMutation } from "@/redux/api/authApi";
import { adminSchema } from "@/schemas/admin";
import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const AdminCreatePage = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const [createAdmin] = useCreateAdminMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await createAdmin(values).unwrap();
      if (res?._id) {
        message.success("Admin created successfully!");
        router.push("/super_admin/admin");
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
            label: "super_admin",
            link: `${role}`,
          },
          {
            label: "admins",
            link: `/${role}/admin`,
          },
          {
            label: "create",
            link: `/${role}/admin/create`,
          },
        ]}
      />

      <h1>Create Admin</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(adminSchema)}>
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
            Admin Information
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
                name="name"
                size="large"
                label="Full Name"
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
                type="email"
                name="email"
                size="large"
                label="Email address"
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
                type="password"
                name="password"
                size="large"
                label="Password"
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
                name="phoneNumber"
                size="large"
                label="Contact No."
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

export default AdminCreatePage;

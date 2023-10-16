"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useUserSignupMutation } from "@/redux/api/authApi";
import { userSchema } from "@/schemas/user";

import { getUserInfo } from "@/services/auth.service";
import { yupResolver } from "@hookform/resolvers/yup";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

const UserCreatePage = () => {
  const { role } = getUserInfo() as any;
  const router = useRouter();
  const [userSignup] = useUserSignupMutation();

  const onSubmit = async (values: any) => {
    try {
      const res = await userSignup(values).unwrap();
      if (res?._id) {
        message.success("User created successfully!");
        router.push(`/${role}/user`);
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
            label: "user",
            link: `/${role}/user`,
          },
          {
            label: "create",
            link: `/${role}/user/create`,
          },
        ]}
      />

      <h1>Create User</h1>
      <Form submitHandler={onSubmit} resolver={yupResolver(userSchema)}>
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

export default UserCreatePage;

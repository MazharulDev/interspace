"use client";
import { Button, Col, Row, message } from "antd";
import loginImage from "../../assets/login.png";
import Image from "next/image";

import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useUserLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Form from "../forms/Form";
import Link from "next/link";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const router = useRouter();
  const [loginUser] = useUserLoginMutation();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await loginUser({ ...data }).unwrap();

      if (res?.accessToken) {
        router.push("/");
        message.success("User logged in successfully");
      }
      storeUserInfo({ accessToken: res?.accessToken });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        minHeight: "100vh",
      }}
    >
      <Col sm={12} md={16} lg={10}>
        <Image src={loginImage} width={500} alt="login image" />
      </Col>

      <Col sm={12} md={8} lg={8}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Login
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="email"
                placeholder="example@email.com"
                type="text"
                size="large"
                label="Email"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="password"
                type="password"
                placeholder="********"
                size="large"
                label="Password"
              />
            </div>
            <Button type="primary" htmlType="submit">
              Login
            </Button>
          </Form>
          <div style={{ marginTop: "10px" }}>
            <p>
              You have not account? <Link href="/sign-up">Sign Up</Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default LoginPage;

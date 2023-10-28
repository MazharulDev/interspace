"use client";
import { Button, Col, Row, message } from "antd";
import signupImage from "../../assets/Signup.png";
import Image from "next/image";

import FormInput from "@/components/forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import Form from "../forms/Form";
import Link from "next/link";
import { useUserSignupMutation } from "@/redux/api/authApi";

type FormValues = {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
};

const SignUp = () => {
  const [userSignup] = useUserSignupMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await userSignup({ ...data }).unwrap();
      if (res?._id) {
        router.push("/login");
        message.success("Account Created successfully, Please login");
      }
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
      <Col sm={12} md={10} lg={10}>
        <Image src={signupImage} width={500} alt="login image" />
      </Col>

      <Col sm={12} md={8} lg={10} style={{ padding: "0 15px" }}>
        <h1
          style={{
            margin: "15px 0px",
          }}
        >
          Create your account
        </h1>
        <div>
          <Form submitHandler={onSubmit}>
            <div>
              <FormInput
                name="name"
                placeholder="Jhon Deo"
                type="text"
                size="large"
                label="Enter your fullname"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="email"
                type="email"
                placeholder="example@email.com"
                size="large"
                label="Enter your email"
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="phoneNumber"
                type="number"
                placeholder="0123456789"
                size="large"
                label="Enter your phonenumber"
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
              Signup
            </Button>
          </Form>
          <div style={{ marginTop: "10px" }}>
            <p>
              Already have an account? <Link href="/login">Login</Link>
            </p>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default SignUp;

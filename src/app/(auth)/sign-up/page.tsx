import { Metadata } from "next";
import SignUp from "@/components/auth/SignUp";

export const metadata: Metadata = {
  title: "IS|signup",
};

const SignUpPage = () => {
  return (
    <>
      <SignUp />
    </>
  );
};

export default SignUpPage;

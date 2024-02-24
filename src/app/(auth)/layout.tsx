"use client";
import AuthNavbar from "@/components/auth/AuthNavbar";
import { Layout } from "antd";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Layout>
      <AuthNavbar />
      <div className="bg-white">{children}</div>
    </Layout>
  );
};

export default AuthLayout;

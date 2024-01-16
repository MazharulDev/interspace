"use client";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";

const PaymentFailPage = () => {
  const { role } = getUserInfo() as any;
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `${role}`,
            link: `/${role}`,
          },
          {
            label: "booking",
            link: `/${role}/booking`,
          },
          {
            label: "payment",
            link: `/${role}/booking/pay`,
          },
        ]}
      />
      <div style={{ textAlign: "center" }}>
        <h1 className="text-xl font-bold mt-5">Failed</h1>
        <h3 style={{ margin: "2rem 0", color: "red" }}>Someting weng wrong</h3>
      </div>
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Link href={`/${role}/booking/pay`}>
          <Button danger>Close</Button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFailPage;

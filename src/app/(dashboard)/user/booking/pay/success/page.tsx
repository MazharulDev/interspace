"use client";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { usePaymentByTransQuery } from "@/redux/api/paymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Button } from "antd";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
const PaymentSuccessPage = () => {
  const { role } = getUserInfo() as any;
  const searchParams = useSearchParams();
  const id = searchParams.get("transactionId");
  const { data } = usePaymentByTransQuery(id);
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
          {
            label: "success",
            link: `/${role}/booking/pay/success`,
          },
        ]}
      />
      <div style={{ textAlign: "center" }}>
        <h1 className="text-xl font-bold mt-5">Congtratulations</h1>
        <h3 style={{ margin: "2rem 0" }}>
          Your payment of Tk <span>{data?.amount}</span> for the month of{" "}
          <span>{data?.month}</span> <span>{data?.year}</span> has been received
        </h3>
        <h3>
          Your transaction Id:{" "}
          <span style={{ color: "blue" }}>{data?.transactionId}</span>
        </h3>
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

export default PaymentSuccessPage;

"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { monthNames } from "@/constants/month";
import { useSingleBookingByEmailQuery } from "@/redux/api/bookingApi";
import { useCreatePaymentMutation } from "@/redux/api/paymentApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row, message } from "antd";

const PaymentPage = () => {
  const { role, userId } = getUserInfo() as any;
  const { data, isLoading } = useSingleBookingByEmailQuery(userId);
  const currentTime = new Date();
  const year = currentTime.getFullYear();
  const month = monthNames[currentTime.getMonth()];
  const [createPayment] = useCreatePaymentMutation();

  const defaultValue = {
    userEmail: data?.email || "",
    phoneNumber: data?.phoneNumber || "",
    address: data?.address || "",
    packageName: data?.packageName || "",
    amount: Number(data?.packagePrice) || "",
    month: month.value || "",
    year: year.toString() || "",
  };

  const onSubmit = async (values: any) => {
    try {
      const res: any = await createPayment(values);
      if (res?.data === null) {
        message.warning("Already Payment");
      } else {
        window.location.replace(res?.data?.link);
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
            label: "booking",
            link: `/${role}/booking`,
          },
          {
            label: "payment",
            link: `/${role}/booking/pay`,
          },
        ]}
      />
      <h1 className="text-4xl font-bold my-4">Payment</h1>
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
            Payment Information
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
                name="packageName"
                size="large"
                label="Package Name"
                defaultValue={data?.packageName}
                disabledInput="true"
              />
            </Col>

            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormSelectField
                options={monthNames}
                name="month"
                size="large"
                label="Months"
                defaultValue={month}
              />
            </Col>
          </Row>
        </div>

        <Button className="bg-blue-500" type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PaymentPage;

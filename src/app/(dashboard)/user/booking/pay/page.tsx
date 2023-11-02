"use client";

import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { useSingleBookingByEmailQuery } from "@/redux/api/bookingApi";
import { getUserInfo } from "@/services/auth.service";
import { Button, Col, Row } from "antd";

const PaymentPage = () => {
  const { role, userId } = getUserInfo() as any;
  const { data, isLoading } = useSingleBookingByEmailQuery(userId);
  console.log(data);

  const defaultValue = {
    packageName: data?.packageName || "",
  };

  const onSubmit = async (values: any) => {
    console.log(values);
    //   try {

    //   } catch (err: any) {
    //     console.error(err.message);
    //   }
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
      <h1>Payment</h1>
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
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default PaymentPage;

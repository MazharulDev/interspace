"use client";

import { Button, Col, Row } from "antd";
import Image from "next/image";
import FormInput from "../forms/FormInput";
import bookingImg from "@/assets/booking.png";
import Form from "../forms/Form";
import FormTextArea from "../forms/FormTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { bookingSchema } from "@/schemas/Booking";

const BookingForm = ({
  onSubmit,
  userData,
  packageData,
  defaultValue,
}: any) => {
  return (
    <div>
      <Row
        justify="center"
        align="middle"
        style={{
          minHeight: "100vh",
        }}
      >
        <Col sm={12} md={8} lg={10}>
          <h1
            style={{
              margin: "15px 0px",
            }}
          >
            Need New Connection?
          </h1>
          <div style={{ marginRight: "2rem" }}>
            <Form
              submitHandler={onSubmit}
              defaultValues={defaultValue}
              resolver={yupResolver(bookingSchema)}
            >
              <div style={{ margin: "1rem 0" }}>
                <FormInput
                  name="name"
                  placeholder="Jhon Deo"
                  type="text"
                  size="large"
                  label="Enter your fullname"
                  disabledInput="true"
                />
              </div>
              <div style={{ margin: "1rem 0" }}>
                <FormInput
                  name="phoneNumber"
                  placeholder="Jhon Deo"
                  type="text"
                  size="large"
                  label="PhoneNumber"
                  disabledInput="true"
                />
              </div>
              <div style={{ margin: "1rem 0" }}>
                <FormInput
                  name="email"
                  placeholder="Jhon Deo"
                  type="text"
                  size="large"
                  label="email"
                  disabledInput="true"
                />
              </div>
              <div style={{ margin: "1rem 0" }}>
                <FormTextArea
                  name="address"
                  placeholder="Enter your address"
                  label="Address"
                />
              </div>
              <div style={{ margin: "1rem 0" }}>
                <FormInput
                  name="packageName"
                  placeholder="Jhon Deo"
                  type="text"
                  size="large"
                  label="Package"
                  disabledInput="true"
                />
              </div>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </div>
        </Col>
        <Col sm={12} md={16} lg={6}>
          <div>
            <h1>24/7 Support Service</h1>
            <Image src={bookingImg} width={500} alt="booking image" />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookingForm;

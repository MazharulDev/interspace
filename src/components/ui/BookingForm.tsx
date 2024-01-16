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
    <div className="max-w-[1200px] mx-auto min-h-[600px] relative overflow-hidden px-5 md:px-0 mt-10 md:mt-0">
      <div className="flex flex-col-reverse justify-center py-6 mx-auto sm:py-12 lg:py-[100px] lg:flex-row lg:justify-between">
        <div>
          <h1 className="text-4xl font-bold my-4">Need New Connection?</h1>
          <div>
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
                  type="text"
                  size="large"
                  label="Package"
                  disabledInput="true"
                />
              </div>
              <div style={{ margin: "1rem 0" }}>
                <FormInput
                  name="packagePrice"
                  placeholder="Jhon Deo"
                  type="text"
                  size="large"
                  label="Package Price"
                  disabledInput="true"
                />
              </div>
              <Button className="bg-blue-500" type="primary" htmlType="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
        <div>
          <div>
            <h1 className="text-4xl font-bold my-4">24/7 Support Service</h1>
            <Image src={bookingImg} width={500} alt="booking image" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;

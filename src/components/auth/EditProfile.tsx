"use client";
import { Avatar, Button, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BreadCrumb from "../ui/Breadcrumb";

import FormInput from "../forms/FormInput";

import Form from "../forms/Form";
import UploadImage from "../ui/UploadImage";

const EditProfile = ({
  role,
  onSubmit,
  name,
  phoneNumber,
  image,
  defaultValue,
}: any) => {
  return (
    <div>
      <BreadCrumb
        items={[
          {
            label: `profile-${role}`,
            link: `/profile`,
          },
          {
            label: `${role}-edit`,
            link: `/profile/${role}-edit`,
          },
        ]}
      />

      <Row justify="center" align="middle">
        <div
          style={{
            textAlign: "center",
            margin: "2rem 0",
          }}
        >
          <Form submitHandler={onSubmit} defaultValues={defaultValue}>
            <Row justify="center" align="middle" style={{ marginTop: "2rem" }}>
              <Space wrap size={16}>
                <UploadImage name="image" />
              </Space>
            </Row>
            <div>
              <FormInput
                name="name"
                placeholder="Jhon Deo"
                type="text"
                size="large"
                label="Name"
                defaultValue={name}
              />
            </div>
            <div
              style={{
                margin: "15px 0px",
              }}
            >
              <FormInput
                name="phoneNumber"
                type="text"
                placeholder="Type Phone number"
                size="large"
                label="Phone Number"
                defaultValue={phoneNumber}
              />
            </div>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form>
        </div>
      </Row>
    </div>
  );
};

export default EditProfile;

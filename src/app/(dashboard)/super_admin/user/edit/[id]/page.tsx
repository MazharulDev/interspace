"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { roleOptions } from "@/constants/global";
import {
  useUpdateUserByIdMutation,
  useUserByIdQuery,
} from "@/redux/api/userApi";

import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
  params: any;
};

const UserUpdatePage = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data } = useUserByIdQuery(id);

  const [updateAdminById] = useUpdateUserByIdMutation();
  const router = useRouter();

  const defaultValue = {
    name: data?.name || "",
    phoneNumber: data?.phoneNumber || "",
    role: data?.role || "",
    email: data?.email || "",
  };
  const onSubmit = async (values: any) => {
    try {
      const res = await updateAdminById({ id, body: values }).unwrap();
      if (res?._id) {
        message.success("User Updated Successfully");
        router.push(`/${role}/user`);
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
            label: "user",
            link: `/${role}/user`,
          },
          {
            label: "update",
            link: `/${role}/user/edit`,
          },
        ]}
      />

      <h1 className="text-4xl font-bold my-4">Update User</h1>
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
            User Information
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
                name="name"
                size="large"
                label="Full Name"
                defaultValue={data?.name}
              />
            </Col>

            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="text"
                name="phoneNumber"
                size="large"
                label="Contact No."
                defaultValue={data?.phoneNumber}
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
                size="large"
                name="role"
                options={roleOptions}
                label="Role"
                placeholder="Select"
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{
                marginBottom: "10px",
              }}
            >
              <FormInput
                type="email"
                name="email"
                size="large"
                label="Email (Not changed)"
                value={data?.email}
                disabledInput="true"
              />
            </Col>
          </Row>
        </div>

        <Button className="bg-blue-500" type="primary" htmlType="submit">
          update
        </Button>
      </Form>
    </div>
  );
};

export default UserUpdatePage;

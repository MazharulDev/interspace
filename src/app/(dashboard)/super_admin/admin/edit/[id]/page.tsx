"use client";
import Form from "@/components/forms/Form";
import FormInput from "@/components/forms/FormInput";
import FormSelectField from "@/components/forms/FormSelectField";
import BreadCrumb from "@/components/ui/Breadcrumb";
import { roleOptions } from "@/constants/global";
import {
  useAdminQuery,
  useUpdateAdminByIdMutation,
} from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";

import { Button, Col, Row, message } from "antd";
import { useRouter } from "next/navigation";

type IDProps = {
  params: any;
};

const AdminUpdatePage = ({ params }: IDProps) => {
  const { role } = getUserInfo() as any;
  const id = params?.id;
  const { data } = useAdminQuery(id);

  const [updateAdminById] = useUpdateAdminByIdMutation();
  const router = useRouter();

  const defaultValue = {
    name: data?.name || "",
    phoneNumber: data?.phoneNumber || "",
    role: data?.role || "",
  };
  const onSubmit = async (values: any) => {
    console.log(values);
    // try {
    //   const res = await updateAdminById({ id, body: values }).unwrap();
    //   if (res?._id) {
    //     message.success("Admin Updated Successfully");
    //     router.push(`/${role}/admin`);
    //   }
    // } catch (err: any) {
    //   console.error(err.message);
    // }
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
            label: "admins",
            link: `/${role}/admin`,
          },
          {
            label: "update",
            link: `/${role}/admin/edit`,
          },
        ]}
      />

      <h1>Update Admin</h1>
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
            Admin Information
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
          </Row>
        </div>

        <Button type="primary" htmlType="submit">
          update
        </Button>
      </Form>
    </div>
  );
};

export default AdminUpdatePage;

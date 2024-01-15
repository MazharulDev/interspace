"use client";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Button } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BreadCrumb from "../ui/Breadcrumb";
import Image from "next/image";
import Form from "../forms/Form";
import UploadImage from "../ui/UploadImage";
import FormInput from "../forms/FormInput";

const EditProfile = ({
  role,
  onSubmit,
  name,
  phoneNumber,
  image,
  defaultValue,
}: any) => {
  const { userId } = getUserInfo() as any;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <BreadCrumb
          items={[
            {
              label: `profile-${role}/edit`,
              link: `/profile`,
            },
          ]}
        />
      </div>
      <div>
        <div className="bg-white md:mx-auto rounded shadow-xl w-full  overflow-hidden">
          <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <Form submitHandler={onSubmit} defaultValues={defaultValue}>
            <div className="px-5 py-2 flex flex-col gap-3 pb-6">
              <div className="h-[110px] shadow-md w-[110px] rounded-full border-4 overflow-hidden -mt-14 border-white">
                <UploadImage name="image" />
              </div>
              <div>
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
                <p className="text-sm text-gray-600 my-2 ml-1">
                  {userId} <span>(Not Changed)</span>
                </p>
              </div>
              <div className="flex gap-3 flex-wrap">
                <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                  {role}
                </span>
              </div>

              <h4 className="text-md font-medium leading-3 mt-3">About</h4>
              <div>
                <FormInput
                  name="phoneNumber"
                  type="text"
                  placeholder="Type Phone number"
                  size="large"
                  label="Phone Number"
                  defaultValue={phoneNumber}
                />
              </div>
            </div>
            <Button
              className="bg-blue-500 ml-5 mb-3"
              type="primary"
              htmlType="submit"
            >
              Update
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default EditProfile;

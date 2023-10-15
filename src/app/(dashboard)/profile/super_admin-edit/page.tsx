"use client";

import EditProfile from "@/components/auth/EditProfile";
import { useUpdateSuperAdminMutation, useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  phoneNumber: string;
};

const SuperAdminEditPage = () => {
  const { userId, role } = getUserInfo() as any;
  const { data } = useUserQuery(userId);
  const [updateSuperAdmin] = useUpdateSuperAdminMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await updateSuperAdmin({
        email: userId,
        body: data,
      }).unwrap();
      if (res?._id) {
        router.push("/profile");
        message.success("super admin updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const name = data?.name;
  const phoneNumber = data?.phoneNumber;
  return (
    <div>
      <EditProfile
        role={role}
        onSubmit={onSubmit}
        name={name}
        phoneNumber={phoneNumber}
      />
    </div>
  );
};

export default SuperAdminEditPage;

"use client";

import EditProfile from "@/components/auth/EditProfile";
import { useUpdateUserMutation, useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  phoneNumber: string;
};

const UserEditProfilePage = () => {
  const { userId, role } = getUserInfo() as any;
  const { data } = useUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();
  const router = useRouter();
  const defaultValue = {
    name: data?.user?.name || "",
    phoneNumber: data?.user?.phoneNumber || "",
  };

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await updateUser({ email: userId, body: data }).unwrap();
      if (res?._id) {
        router.push("/profile");
        message.success("User updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const name = data?.user?.name;
  const phoneNumber = data?.user?.phoneNumber;
  return (
    <div>
      <EditProfile
        role={role}
        onSubmit={onSubmit}
        name={name}
        phoneNumber={phoneNumber}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default UserEditProfilePage;

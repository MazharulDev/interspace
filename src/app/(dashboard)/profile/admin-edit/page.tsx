"use client";
import EditProfile from "@/components/auth/EditProfile";
import { useUpdateAdminMutation } from "@/redux/api/adminApi";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { message } from "antd";
import { useRouter } from "next/navigation";
import { SubmitHandler } from "react-hook-form";

type FormValues = {
  name: string;
  phoneNumber: string;
};

const AdminEditProfilePage = () => {
  const { userId, role } = getUserInfo() as any;
  const { data } = useUserQuery(userId);
  const [updateAdmin] = useUpdateAdminMutation();
  const router = useRouter();
  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await updateAdmin({ email: userId, body: data }).unwrap();
      if (res?._id) {
        router.push("/profile");
        message.success("Admin updated successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const name = data?.admin?.name;
  const phoneNumber = data?.admin?.phoneNumber;
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

export default AdminEditProfilePage;

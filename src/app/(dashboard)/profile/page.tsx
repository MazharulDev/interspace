"use client";
import Profile from "@/components/auth/Profile";
import SuperAdminProfile from "@/components/auth/SuperAdminProfile";
import { getUserInfo } from "@/services/auth.service";

const ProfilePage = () => {
  const { role } = getUserInfo() as any;
  return (
    <div>{role === "super_admin" ? <SuperAdminProfile /> : <Profile />}</div>
  );
};

export default ProfilePage;

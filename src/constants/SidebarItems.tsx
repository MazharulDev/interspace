import { MenuProps } from "antd";
import {
  ProfileOutlined,
  TableOutlined,
  WifiOutlined,
  CarryOutOutlined,
  FormOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { USER_ROLE } from "./role";
export const sidebarItems = (role: string) => {
  const defaultSidebarItems: MenuProps["items"] = [
    {
      label: "Profile",
      key: "profile",
      icon: <ProfileOutlined />,
      children: [
        {
          label: <Link href={`/profile`}>Account Profile</Link>,
          key: `/profile`,
        },
        {
          label: <Link href={`/profile/${role}-edit`}>Update Profile</Link>,
          key: `/${role}/profile`,
        },
      ],
    },
    {
      label: <Link href={`/${role}/booking`}>My booking connection</Link>,
      icon: <CarryOutOutlined />,
      key: `/${role}/booking`,
    },
  ];
  const commonAdminSidebarItems: MenuProps["items"] = [
    // {
    //   label: <Link href={`/${role}/user`}>Manage User</Link>,
    //   icon: <TableOutlined />,
    //   key: `/${role}/user`,
    // },
  ];

  const adminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
    {
      label: <Link href={`/${role}/services`}>Services</Link>,
      icon: <WifiOutlined />,
      key: `/${role}/services`,
    },
    {
      label: <Link href={`/${role}/manage-booking`}>Manage Booking</Link>,
      icon: <FormOutlined />,
      key: `/${role}/manage-booking`,
    },
    {
      label: <Link href={`/${role}/manage-review`}>Manage Review</Link>,
      icon: <FormOutlined />,
      key: `/${role}/manage-review`,
    },
  ];

  const superAdminSidebarItems: MenuProps["items"] = [
    ...defaultSidebarItems,
    ...commonAdminSidebarItems,
    {
      label: <Link href={`/${role}/admin`}>Manage Admin</Link>,
      icon: <TableOutlined />,
      key: `/${role}/admin`,
    },
    {
      label: <Link href={`/${role}/user`}>Manage User</Link>,
      icon: <TableOutlined />,
      key: `/${role}/user`,
    },
  ];

  if (role === USER_ROLE.SUPER_ADMIN) return superAdminSidebarItems;
  else if (role === USER_ROLE.ADMIN) return adminSidebarItems;
  else {
    return defaultSidebarItems;
  }
};

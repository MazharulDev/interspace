"use client";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import BreadCrumb from "../ui/Breadcrumb";
import Image from "next/image";

const Profile = () => {
  const { userId, role } = getUserInfo() as any;
  const { data } = useUserQuery(userId);
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
              label: `profile-${role}`,
              link: `/profile`,
            },
          ]}
        />
      </div>
      <div>
        <div className="bg-white md:mx-auto rounded shadow-xl w-full  overflow-hidden">
          <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="px-5 py-2 flex flex-col gap-3 pb-6">
            <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
              {role === "user" ? (
                <div>
                  {data?.user?.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={data?.user?.image}
                      alt="avatar"
                      className="w-full h-full rounded-full object-center object-cover"
                    />
                  ) : (
                    <Avatar size={85} icon={<UserOutlined />} />
                  )}
                </div>
              ) : (
                <div>
                  {data?.admin?.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={data?.admin?.image}
                      alt="avatar"
                      className="w-full h-full rounded-full object-center object-cover"
                    />
                  ) : (
                    <Avatar size={85} icon={<UserOutlined />} />
                  )}
                </div>
              )}
            </div>
            <div>
              <h3 className="text-xl text-slate-900 relative font-bold leading-6">
                {role === "user" ? (
                  <h2>{data?.user?.name}</h2>
                ) : (
                  <h2>{data?.admin?.name}</h2>
                )}
              </h3>
              <p className="text-sm text-gray-600">{userId}</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                {role}
              </span>
            </div>

            <h4 className="text-md font-medium leading-3 mt-3">About</h4>
            <p className="text-sm text-stone-500">
              {" "}
              {role === "user" ? (
                <p>{data?.user?.phoneNumber}</p>
              ) : (
                <p>{data?.admin?.phoneNumber}</p>
              )}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

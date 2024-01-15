import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Image from "next/image";

const ViewProfile = ({ data, role }: any) => {
  return (
    <>
      <div>
        <div className="bg-white md:mx-auto rounded shadow-xl w-full  overflow-hidden">
          <div className="h-[140px] bg-gradient-to-r from-cyan-500 to-blue-500"></div>
          <div className="px-5 py-2 flex flex-col gap-3 pb-6">
            <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
              {role === "user" ? (
                <div>
                  {data?.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={data?.image}
                      alt="avatar"
                      className="w-full h-full rounded-full object-center object-cover"
                    />
                  ) : (
                    <Avatar size={85} icon={<UserOutlined />} />
                  )}
                </div>
              ) : (
                <div>
                  {data?.image ? (
                    <Image
                      width={100}
                      height={100}
                      src={data?.image}
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
                <h2>{data?.name}</h2>
              </h3>
              <p className="text-sm text-gray-600">{data?.email}</p>
            </div>
            <div className="flex gap-3 flex-wrap">
              <span className="rounded-sm bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                {role}
              </span>
            </div>

            <h4 className="text-md font-medium leading-3 mt-3">About</h4>
            <p className="text-sm text-stone-500">
              {" "}
              <p>{data?.phoneNumber}</p>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewProfile;

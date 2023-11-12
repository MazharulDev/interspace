import { authkey } from "@/constants/storageKey";
import { useUserQuery } from "@/redux/api/userApi";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { UserOutlined, ArrowLeftOutlined } from "@ant-design/icons";

import {
  Avatar,
  Button,
  Dropdown,
  Flex,
  Layout,
  MenuProps,
  Row,
  Space,
} from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();
  const logOut = () => {
    removeUserInfo(authkey);
    router.push("/login");
  };
  const { role, userId } = getUserInfo() as any;
  const { data } = useUserQuery(userId);
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Flex justify="space-between" align="center">
        <Row
          justify="end"
          align="middle"
          style={{
            height: "100%",
          }}
        >
          <Link href="/">
            <ArrowLeftOutlined />
            Home
          </Link>
        </Row>
        <Row
          justify="end"
          align="middle"
          style={{
            height: "100%",
          }}
        >
          <p
            style={{
              margin: "0px 5px",
            }}
          >
            {role}
          </p>
          <Dropdown menu={{ items }}>
            <a>
              <Space wrap size={16}>
                {role === "user" ? (
                  <div>
                    {data?.user?.image ? (
                      <Avatar
                        src={
                          <Image
                            width={30}
                            height={30}
                            src={data?.user?.image}
                            alt="avatar"
                            style={{ width: "100%", borderRadius: "50%" }}
                          />
                        }
                      ></Avatar>
                    ) : (
                      <Avatar size="large" icon={<UserOutlined />} />
                    )}
                  </div>
                ) : (
                  <div>
                    {data?.admin?.image ? (
                      <Avatar
                        src={
                          <Image
                            width={30}
                            height={30}
                            src={data?.admin?.image}
                            alt="avatar"
                            style={{ width: "100%", borderRadius: "50%" }}
                          />
                        }
                      ></Avatar>
                    ) : (
                      <Avatar size="large" icon={<UserOutlined />} />
                    )}
                  </div>
                )}
              </Space>
            </a>
          </Dropdown>
        </Row>
      </Flex>
    </AntHeader>
  );
};

export default Header;

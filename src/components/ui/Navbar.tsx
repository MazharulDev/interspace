import Link from "next/link";
import "../../css/Navbar.css";
import { Avatar, Button, Dropdown, MenuProps, Row, Space } from "antd";
import { UserOutlined, MenuOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authkey } from "@/constants/storageKey";

const Navbar = () => {
  const router = useRouter();
  const logOut = () => {
    removeUserInfo(authkey);
    router.push("/login");
  };
  const { userId } = getUserInfo() as any;
  const items: MenuProps["items"] = [
    {
      key: "0",
      label: <Link href="/profile">Profile</Link>,
    },
    {
      key: "1",
      label: <Link href="/profile">My Order</Link>,
    },
    {
      key: "2",
      label: (
        <Button onClick={logOut} type="text" danger>
          Logout
        </Button>
      ),
    },
  ];
  return (
    <nav className="navbar container">
      <Link className="logo" href="/">
        Interspace
      </Link>
      <input type="checkbox" id="toggler" />
      <label htmlFor="toggler">
        <i className="ri-menu-line">
          {" "}
          <MenuOutlined />
        </i>
      </label>
      <div className="menu">
        <ul className="list">
          <li>
            <Link href="#">About Us</Link>
          </li>
          <li>
            <Link href="#">Services</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Coverage Area</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
          <li>
            <Row>
              <Dropdown menu={{ items }}>
                <a>
                  <Space wrap size={16}>
                    <Avatar size="large" icon={<UserOutlined />} />
                  </Space>
                </a>
              </Dropdown>
            </Row>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

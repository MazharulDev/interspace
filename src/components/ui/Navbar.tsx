import Link from "next/link";
import "../../css/Navbar.css";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authkey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const logOut = () => {
    removeUserInfo(authkey);
    router.push("/login");
  };
  const { userId } = getUserInfo() as any;
  return (
    <nav className="navbar container">
      <Link style={{ fontWeight: "bold" }} className="logo" href="/">
        Interspace
      </Link>
      <input type="checkbox" id="toggler" />
      <label htmlFor="toggler">
        <i className="ri-menu-line" style={{ background: "white" }}>
          {" "}
          <MenuOutlined />
        </i>
      </label>
      <div className="menu">
        <ul className="list">
          <li>
            <Link style={{ color: "white" }} href="/packages">
              Packages
            </Link>
          </li>

          {userId && (
            <li>
              <Link style={{ color: "white" }} href="/your-review">
                Review
              </Link>
            </li>
          )}

          {userId && (
            <li>
              <Link style={{ color: "white" }} href="/profile">
                Dashboard
              </Link>
            </li>
          )}
          {userId ? (
            <li>
              <Button danger onClick={logOut}>
                Logout
              </Button>
            </li>
          ) : (
            <li>
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

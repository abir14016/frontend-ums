import { Avatar, Button, Dropdown, Layout, MenuProps, Row, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { getUserInfo, removeUserInfo } from "@/services/auth.service";
import { authKey } from "@/constants/storageKey";
import { useRouter } from "next/navigation";
import { useAdminQuery } from "@/redux/api/adminApi";
import Loading from "@/app/loading";
import { useStudentProfileQuery } from "@/redux/api/studentApi";
import { useFacultyProfileQuery } from "@/redux/api/facultyApi";
const { Header: AntHeader } = Layout;

const Header = () => {
  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

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
  const { role, userId } = getUserInfo() as any;
  // Conditionally choose the appropriate query hook based on the role
  const getQueryHook = () => {
    switch (role) {
      case "admin":
        return useAdminQuery;
      case "student":
        return useStudentProfileQuery;
      case "faculty":
        return useFacultyProfileQuery;
      default:
        return null;
    }
  };

  const QueryHook = getQueryHook();
  const {
    data: userData,
    error,
    isLoading,
  }: { data?: any; error?: any; isLoading?: boolean } = QueryHook
    ? QueryHook(userId)
    : {};

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    console.log(error);
  }
  return (
    <AntHeader
      style={{
        background: "#fff",
      }}
    >
      <Row
        justify="end"
        align="middle"
        style={{
          height: "100%",
        }}
      >
        <div>
          <p style={{ margin: "0 5px 0 0", display: "inline", color: "blue" }}>
            {role}
          </p>
          {userData && (
            <span style={{ margin: "0 5px 0 0", display: "inline" }}> || </span>
          )}
          {userData && (
            <p
              style={{ margin: "0 5px 0 0", display: "inline", color: "blue" }}
            >
              {userData.id}
            </p>
          )}
        </div>
        <Dropdown menu={{ items }}>
          <a>
            <Space wrap size={16}>
              {userData && userData.profileImage ? (
                <Avatar size="large" src={userData.profileImage} />
              ) : (
                <Avatar size="large" icon={<UserOutlined />} />
              )}
            </Space>
          </a>
        </Dropdown>
      </Row>
    </AntHeader>
  );
};

export default Header;

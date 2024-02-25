"use client";

import Loading from "@/app/loading";
import { useAdminQuery } from "@/redux/api/adminApi";
import { useFacultyProfileQuery } from "@/redux/api/facultyApi";
import { useStudentProfileQuery } from "@/redux/api/studentApi";
import { getUserInfo } from "@/services/auth.service";
import { Alert, Avatar, Card, Divider, Image, Typography } from "antd";
const { Text } = Typography;
import { UserOutlined } from "@ant-design/icons";
import Meta from "antd/es/card/Meta";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";
import { useUserQuery } from "@/redux/api/userApi";
import UMModal from "@/components/ui/UMModal";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const ProfilePage = () => {
  const { role, userId } = getUserInfo() as any;
  const router = useRouter();

  //get userData from users collection of auth service searching by id(ex: A-00001)
  const { data } = useUserQuery(userId);
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    // Check if the user needs a password change
    if (data && data.needsPasswordChange) {
      setOpen(true);
    }
  }, [data]);

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
    return <Loading></Loading>;
  }
  if (error) {
    console.log(error);
  }

  const redirectPageHandler = async (role: string) => {
    router.push(`${role}/change-password`);
  };

  const base = role;

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "my-profile", link: `/profile` },
        ]}
      />
      <h1 style={{ textAlign: "left" }}>Welcome To Your Profile</h1>
      <Card
        style={{ width: 300, margin: "auto" }}
        cover={
          userData && userData.profileImage ? (
            <Image
              width="auto"
              height={300}
              alt="Profile"
              src={userData?.profileImage}
            />
          ) : (
            <Image
              width="auto"
              height={300}
              alt="super-admin-Profile-placeholder"
              src="https://cdn.vectorstock.com/i/preview-1x/95/01/avatar-profile-account-icon-vector-1979501.jpg"
            />
          )
        }
      >
        {role === "super_admin" && (
          <p style={{ fontSize: "24px", fontWeight: "bold", color: "blue" }}>
            {role}
          </p>
        )}
        {userData && (
          <p style={{ fontSize: "20px", fontWeight: "bold" }}>
            {userData?.name?.firstName} {userData?.name?.middleName}{" "}
            {userData?.name?.lastName}
          </p>
        )}
        {userData && (
          // <Meta title={`ID: ${userData?.id}`} description={`Role: ${role}`} />
          <h3>
            <Text mark underline>
              ID: {userData?.id}
            </Text>
          </h3>
        )}
        <Divider />
        {userData && <p>Email: {userData?.email}</p>}
        {userData && <p>Contact Number: {userData?.contactNo}</p>}
        {userData && <p>Present Address: {userData?.presentAddress}</p>}
      </Card>

      <UMModal
        title="Change Password"
        isOpen={open}
        closeModal={() => setOpen(false)}
        handleOk={() => redirectPageHandler(role)}
      >
        <Alert
          message="Warning"
          description="Your password needs to be changed. Click OK to proceed."
          type="warning"
          showIcon
        />
        {/* <p className="my-5">
          Your password needs to be changed. Click OK to proceed.
        </p> */}
      </UMModal>
    </div>
  );
};

export default ProfilePage;

"use client";

import AccessDenied from "@/app/access-denied";
import { useAdminQuery } from "@/redux/api/adminApi";
import { getUserInfo } from "@/services/auth.service";
import { Avatar, Badge, Card, Col, Divider, Row, Typography } from "antd";
const { Text } = Typography;
import { UserOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";
import { useState } from "react";

const AdminPage = () => {
  const { role, userId } = getUserInfo() as any;

  const { data: adminData, isLoading } = useAdminQuery(userId);

  const tabList = [
    {
      key: "gender",
      tab: "Gender",
    },
    {
      key: "bloodGroup",
      tab: "Blood Group",
    },
    {
      key: "dateOfBirth",
      tab: "Date Of Birth",
    },
    {
      key: "contactNo",
      tab: "Contact No.",
    },
    {
      key: "emergencyContactNo",
      tab: "Emergency Contact No.",
    },
    {
      key: "managementDepartment",
      tab: "Department",
    },
    {
      key: "presentAddress",
      tab: "Present Address",
    },
    {
      key: "permanentAddress",
      tab: "Permanent Address",
    },
    {
      key: "designation",
      tab: "Designation",
    },
  ];

  const contentList: Record<string, React.ReactNode> = {
    gender: <h4>{adminData?.gender}</h4>,
    bloodGroup: <h4>{adminData?.bloodGroup}</h4>,
    dateOfBirth: <h4>{adminData?.dateOfBirth}</h4>,
    contactNo: <h4>{adminData?.contactNo}</h4>,
    emergencyContactNo: <h4>{adminData?.emergencyContactNo}</h4>,
    managementDepartment: <h4>{adminData?.managementDepartment?.title}</h4>,
    presentAddress: <h4>{adminData?.presentAddress}</h4>,
    permanentAddress: <h4>{adminData?.permanentAddress}</h4>,
    designation: <h4>{adminData?.designation}</h4>,
  };

  const [activeTabKey1, setActiveTabKey1] = useState<string>("gender");

  const onTab1Change = (key: string) => {
    setActiveTabKey1(key);
  };

  return isLoading ? (
    <Loading></Loading>
  ) : (
    <>
      <h1>Your Admin Profile</h1>
      <Badge.Ribbon text={role}>
        <Card style={{ margin: "30px 0" }}>
          <Row style={{ margin: "30px 0" }} align="middle">
            <Col>
              {adminData && adminData.profileImage ? (
                <Avatar size={170} src={adminData.profileImage} />
              ) : (
                <Avatar size={170} icon={<UserOutlined />} />
              )}
            </Col>
            <Col style={{ margin: "0 10px" }}>
              <div>
                <h1>
                  {adminData?.name?.firstName} {adminData?.name?.middleName}{" "}
                  {adminData?.name?.lastName}
                </h1>
                <h4>
                  <Text mark>ID: {adminData?.id}</Text>
                </h4>
                <Text type="secondary">{adminData?.email}</Text>
              </div>
            </Col>
          </Row>
          <Divider></Divider>
          <Card
            style={{ width: "100%" }}
            title="Click to see details"
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}
          >
            {contentList[activeTabKey1]}
          </Card>
        </Card>
      </Badge.Ribbon>
    </>
  );
};

export default AdminPage;

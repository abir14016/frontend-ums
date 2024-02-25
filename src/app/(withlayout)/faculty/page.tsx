"use client";

import { useFacultyProfileQuery } from "@/redux/api/facultyApi";
import { getUserInfo } from "@/services/auth.service";
import {
  Avatar,
  Badge,
  Card,
  Col,
  Descriptions,
  Divider,
  Row,
  Typography,
} from "antd";
const { Text } = Typography;
import { UserOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import Loading from "@/app/loading";

const FacultyPage = () => {
  const { role, userId } = getUserInfo() as any;

  const { data: facultyData, isLoading } = useFacultyProfileQuery(userId);
  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Academic Faculty",
      children: facultyData?.academicFaculty?.title,
    },
    {
      key: "2",
      label: "Academic Department",
      children: facultyData?.academicDepartment?.title,
    },
    {
      key: "3",
      label: "Designation",
      children: facultyData?.designation,
    },
    {
      key: "4",
      label: "Contact No.",
      children: facultyData?.contactNo,
    },
    {
      key: "5",
      label: "Emergency Contact No.",
      children: facultyData?.emergencyContactNo,
    },
    {
      key: "6",
      label: "Gender",
      children: facultyData?.gender,
    },
    {
      key: "7",
      label: "Blood Group",
      children: facultyData?.bloodGroup,
    },
    {
      key: "8",
      label: "Present Address",
      children: facultyData?.presentAddress,
    },
    {
      key: "9",
      label: "Permanent Address",
      children: facultyData?.permanentAddress,
    },
  ];
  return isLoading ? (
    <Loading></Loading>
  ) : (
    <>
      <h1>Your Faculty profile</h1>
      <Badge.Ribbon text={role}>
        <Card>
          <Row style={{ margin: "30px 0" }} align="middle">
            <Col>
              {facultyData && facultyData.profileImage ? (
                <Avatar size={170} src={facultyData.profileImage} />
              ) : (
                <Avatar size={170} icon={<UserOutlined />} />
              )}
            </Col>
            <Col style={{ margin: "0 10px" }}>
              <div>
                <h1>
                  {facultyData?.name?.firstName} {facultyData?.name?.middleName}{" "}
                  {facultyData?.name?.lastName}
                </h1>
                <h4>ID: {facultyData?.id}</h4>
                <Text type="secondary">{facultyData?.email}</Text>
              </div>
            </Col>
          </Row>
          <Divider></Divider>
          <Descriptions title="Details" items={items} />
        </Card>
      </Badge.Ribbon>
    </>
  );
};

export default FacultyPage;

"use client";

import { useFacultyQuery } from "@/redux/api/facultyApi";
import { Avatar, Col, Descriptions, Divider, Row, Typography } from "antd";
const { Text } = Typography;
import { UserOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import Loading from "@/app/loading";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const FacultyDetails = ({ params }: { params: any }) => {
  const { id } = params;
  const { data: facultyData, isLoading } = useFacultyQuery(id);
  if (isLoading) {
    return <Loading></Loading>;
  }
  const name = `${facultyData?.firstName} ${facultyData?.middleName} ${facultyData?.lastName}`;
  console.log(facultyData);

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: name,
    },
    {
      key: "2",
      label: "Faculty ID",
      children: facultyData?.facultyId,
    },
    {
      key: "3",
      label: "Academic Faculty",
      children: facultyData?.academicFaculty?.title,
    },
    {
      key: "4",
      label: "Academic Department",
      children: facultyData?.academicDepartment?.title,
    },
    {
      key: "5",
      label: "Designation",
      children: facultyData?.designation,
    },
    {
      key: "6",
      label: "Gender",
      children: facultyData?.gender,
    },
    {
      key: "7",
      label: "Blood Groupt",
      children: facultyData?.bloodGroup,
    },
    {
      key: "8",
      label: "COntact No.",
      children: facultyData?.contactNo,
    },
  ];

  const base = "admin";

  return (
    <>
      <div>
        <UMBreadCrumb
          items={[
            { label: `${base}`, link: `/${base}` },
            { label: "manage-faculty", link: `/${base}/manage-faculty` },
          ]}
        />
        <h1 style={{ margin: "10px 0px" }}>Faculty Details</h1>
        <Row style={{ margin: "15px 30px" }} align="middle">
          <Col>
            {facultyData && facultyData.profileImage ? (
              <Avatar
                size={170}
                shape="square"
                src={facultyData.profileImage}
              />
            ) : (
              <Avatar size={170} shape="square" icon={<UserOutlined />} />
            )}
          </Col>
          <Col style={{ margin: "0 10px" }}>
            <div>
              <h1>
                {facultyData?.firstName} {facultyData?.middleName}{" "}
                {facultyData?.lastName}
              </h1>
              <h4>Department Of {facultyData?.academicDepartment?.title}</h4>
              <h6>
                <Text mark underline>
                  Faculty ID: {facultyData?.facultyId}
                </Text>
              </h6>
              <Text type="secondary">{facultyData?.email}</Text>
            </div>
          </Col>
        </Row>
        <Divider></Divider>
        <Descriptions title="Faculty Information" items={items} bordered />
      </div>
    </>
  );
};

export default FacultyDetails;

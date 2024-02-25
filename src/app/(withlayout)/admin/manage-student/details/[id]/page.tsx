"use client";

import Loading from "@/app/loading";
import {
  useStudentProfileQuery,
  useStudentQuery,
} from "@/redux/api/studentApi";
import {
  Avatar,
  Carousel,
  Col,
  Descriptions,
  Divider,
  Row,
  Typography,
} from "antd";
import type { DescriptionsProps } from "antd";
const { Text } = Typography;
import { UserOutlined } from "@ant-design/icons";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const StudentDetails = ({ params }: { params: any }) => {
  const { id } = params;
  const { data: student, isLoading: studentIsLoading } = useStudentQuery(id);
  const { data: studentData, isLoading: studentDataIsLoading } =
    useStudentProfileQuery(student?.studentId);

  if (studentIsLoading) {
    return <Loading></Loading>;
  }
  if (studentDataIsLoading) {
    return <Loading></Loading>;
  }

  const contentStyle: React.CSSProperties = {
    padding: "50px",
    height: "400px",
    color: "#fff",
    lineHeight: "160px",
    // textAlign: "center",
    background: "#364d79",
  };
  const studentName = `${studentData?.name?.firstName} ${studentData?.name?.middleName} ${studentData?.name?.lastName}`;
  const academicSemester = `${studentData?.academicSemester?.title} - (${studentData?.academicSemester?.year})`;
  const academicItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: studentName,
    },
    {
      key: "2",
      label: "studentId",
      children: student?.studentId,
    },
    {
      key: "3",
      label: "Academic Faculty",
      children: studentData?.academicFaculty?.title,
    },
    {
      key: "4",
      label: "Academic Department",
      children: studentData?.academicDepartment?.title,
    },
    {
      key: "5",
      label: "Academic Semester",
      children: academicSemester,
    },
    {
      key: "6",
      label: "Gender",
      children: studentData?.gender,
    },
  ];

  const basicItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Email",
      children: studentData?.email,
    },
    {
      key: "2",
      label: "Contact No.",
      children: studentData?.contactNo,
    },
    {
      key: "3",
      label: "Emergency Contact No.",
      children: studentData?.emergencyContactNo,
    },
    {
      key: "4",
      label: "Date Of Birth",
      children: studentData?.dateOfBirth,
    },
    {
      key: "5",
      label: "Blood Group",
      children: studentData?.bloodGroup,
    },
    {
      key: "6",
      label: "Present Address",
      children: studentData?.presentAddress,
    },
    {
      key: "7",
      label: "Permanent Address",
      children: studentData?.permanentAddress,
    },
  ];

  const guardianItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Father Name",
      children: studentData?.guardian?.fatherName,
    },
    {
      key: "2",
      label: "Father Occupation",
      children: studentData?.guardian?.fatherOccupation,
    },
    {
      key: "3",
      label: "Father Contact No.",
      children: studentData?.guardian?.fatherContactNo,
    },
    {
      key: "4",
      label: "Mother Name",
      children: studentData?.guardian?.motherName,
    },
    {
      key: "5",
      label: "Mother Occupation",
      children: studentData?.guardian?.motherOccupation,
    },
    {
      key: "6",
      label: "Mother Contact No.",
      children: studentData?.guardian?.motherContactNo,
    },
    {
      key: "7",
      label: "Address",
      children: studentData?.guardian?.address,
    },
  ];

  const localGuardianItems: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Local Guardian Name",
      children: studentData?.localGuardian?.name,
    },
    {
      key: "2",
      label: "Local Guardian Occupation",
      children: studentData?.localGuardian?.occupation,
    },
    {
      key: "3",
      label: "Local Guardian Contact No.",
      children: studentData?.localGuardian?.contactNo,
    },
    {
      key: "4",
      label: "Local Guardian Address",
      children: studentData?.localGuardian?.address,
    },
  ];

  const base = "admin";

  return (
    <>
      <div>
        <UMBreadCrumb
          items={[
            { label: `${base}`, link: `/${base}` },
            { label: "manage-student", link: `/${base}/manage-student` },
          ]}
        />
        <h1 style={{ margin: "10px 0px" }}>Student Details</h1>
        <Row style={{ margin: "15px 30px" }} align="middle">
          <Col>
            {studentData && studentData.profileImage ? (
              <Avatar
                size={170}
                shape="square"
                src={studentData.profileImage}
              />
            ) : (
              <Avatar size={170} shape="square" icon={<UserOutlined />} />
            )}
          </Col>
          <Col style={{ margin: "0 10px" }}>
            <div>
              <h1>
                {studentData?.name?.firstName} {studentData?.name?.middleName}{" "}
                {studentData?.name?.lastName}
              </h1>
              <h4>Department Of {studentData?.academicDepartment?.title}</h4>
              <h6>
                <Text mark underline>
                  Faculty ID: {studentData?.id}
                </Text>
              </h6>
              <Text type="secondary">{studentData?.email}</Text>
            </div>
          </Col>
        </Row>
        <Carousel dotPosition="top" autoplay effect="fade">
          <div>
            <div style={contentStyle}>
              <h1>Academic Information</h1>
              <Divider style={{ color: "white" }}></Divider>
              <Descriptions
                contentStyle={{ color: "white" }}
                items={academicItems}
              />
              <Divider style={{ color: "white" }}></Divider>
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <h1>Basic Information</h1>
              <Divider style={{ color: "white" }}></Divider>
              <Descriptions
                contentStyle={{ color: "white" }}
                items={basicItems}
              />
              <Divider style={{ color: "white" }}></Divider>
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <h1>Guardian Information</h1>
              <Divider style={{ color: "white" }}></Divider>
              <Descriptions
                contentStyle={{ color: "white" }}
                items={guardianItems}
              />
              <Divider style={{ color: "white" }}></Divider>
            </div>
          </div>
          <div>
            <div style={contentStyle}>
              <h1>Local Guardian Information</h1>
              <Divider style={{ color: "white" }}></Divider>
              <Descriptions
                contentStyle={{ color: "white" }}
                items={localGuardianItems}
              />
              <Divider style={{ color: "white" }}></Divider>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default StudentDetails;

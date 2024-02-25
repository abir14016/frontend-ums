"use client";
import { Avatar, Col, Row, Space } from "antd";
import FormInput from "../Forms/FormInput";
import { getUserInfo } from "@/services/auth.service";
import { useStudentProfileQuery } from "@/redux/api/studentApi";
import { UserOutlined } from "@ant-design/icons";
import Loading from "@/app/loading";

const StudentReadonlyInfo = () => {
  const { userId } = getUserInfo() as any;
  const {
    data: studentData,
    isLoading,
    isError,
  } = useStudentProfileQuery(userId);
  if (isLoading) {
    return <Loading></Loading>;
  }
  if (isError) {
    console.log(isError);
  }
  return (
    <div
      style={{
        border: "1px solid #d9d9d9",
        borderRadius: "5px",
        padding: "15px",
        marginBottom: "10px",
        marginTop: "10px",
      }}
    >
      <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
        <Col
          className="gutter-row"
          span={6}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            value={`${studentData?.name?.firstName} ${studentData?.name?.middleName} ${studentData?.name?.lastName}`}
            readonly
            type="text"
            name="student.name"
            size="large"
            label="Name"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            value={studentData?.academicDepartment?.title}
            readonly
            type="text"
            name="student.academicDepartment.title"
            size="large"
            label="Department"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            value={studentData?.academicFaculty?.title}
            readonly
            type="text"
            name="student.academicFaculty.title"
            size="large"
            label="Faculty"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            value={`${studentData?.academicSemester?.title}-${studentData?.academicSemester?.year}`}
            readonly
            type="text"
            name="student.academicSemester.title"
            size="large"
            label="Semester"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          <FormInput
            value={studentData?.gender}
            readonly
            type="text"
            name="student.gender"
            size="large"
            label="gender"
          />
        </Col>
        <Col
          className="gutter-row"
          span={8}
          style={{
            marginBottom: "10px",
          }}
        >
          {studentData && studentData.profileImage ? (
            <Space wrap size={16}>
              <Avatar
                shape="square"
                size={96}
                src={studentData?.profileImage}
              />
            </Space>
          ) : (
            <Avatar size="large" icon={<UserOutlined />} />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default StudentReadonlyInfo;

import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";
import Loading from "@/app/loading";
import { getUserInfo } from "@/services/auth.service";
import { useStudentProfileQuery } from "@/redux/api/studentApi";

const GuardianReadonlyInfo = () => {
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
    <>
      <div
        style={{
          border: "1px solid #d9d9d9",
          borderRadius: "5px",
          padding: "15px",
          marginBottom: "10px",
          marginTop: "10px",
        }}
      >
        <p style={{ fontSize: "18px", fontWeight: "500", margin: "5px 0px" }}>
          Guardian information
        </p>
        <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              value={studentData?.guardian?.fatherName}
              readonly
              name="student.guardian.fatherName"
              label="Father name"
              size="large"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              value={studentData?.guardian?.fatherOccupation}
              readonly
              name="student.guardian.fatherOccupation"
              label="Father occupation"
              size="large"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              value={studentData?.guardian?.fatherContactNo}
              readonly
              name="student.guardian.fatherContactNo"
              label="Father contact no."
              size="large"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              value={studentData?.guardian?.motherName}
              readonly
              name="student.guardian.motherName"
              label="Mother name"
              size="large"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              value={studentData?.guardian?.motherOccupation}
              readonly
              name="student.guardian.motherOccupation"
              label="Mother occupation"
              size="large"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              value={studentData?.guardian?.motherContactNo}
              readonly
              name="student.guardian.motherContactNo"
              label="Mother contact no."
              size="large"
            />
          </Col>

          <Col span={6} style={{ margin: "10px 0" }}>
            <FormInput
              value={studentData?.guardian?.address}
              readonly
              name="student.guardian.address"
              label="Address"
              size="large"
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default GuardianReadonlyInfo;

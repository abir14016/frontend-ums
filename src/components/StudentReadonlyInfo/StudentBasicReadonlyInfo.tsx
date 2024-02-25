import { Col, Row } from "antd";
import FormInput from "../Forms/FormInput";
import FormDatePicker from "../Forms/FormDatePicker";
import FormSelectField from "../Forms/FormSelectField";
import FormTextArea from "../Forms/FormTextArea";
import { bloodGroupOptions } from "@/constants/global";
import Loading from "@/app/loading";
import { getUserInfo } from "@/services/auth.service";
import { useStudentProfileQuery } from "@/redux/api/studentApi";

const StudentBasicReadonlyInfo = () => {
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
  const originalDateOfBirth = new Date(studentData?.dateOfBirth);

  const formattedDateOfBirth = originalDateOfBirth.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });

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
      <Row gutter={{ xs: 24, xl: 8, lg: 8, md: 24 }}>
        <Col span={8} style={{ margin: "10px 0" }}>
          <FormInput
            value={studentData?.email}
            readonly
            type="email"
            name="student.email"
            label="Email address"
            size="large"
          />
        </Col>

        <Col span={8} style={{ margin: "10px 0" }}>
          <FormInput
            value={studentData?.contactNo}
            readonly
            name="student.contactNo"
            label="Contact no."
            size="large"
          />
        </Col>

        <Col span={8} style={{ margin: "10px 0" }}>
          <FormInput
            value={studentData?.emergencyContactNo}
            readonly
            name="student.emergencyContactNo"
            label="Emergency contact no."
            size="large"
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormInput
            value={formattedDateOfBirth}
            readonly
            name="student.dateOfBirth"
            label="Date Of Birth"
            size="large"
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormInput
            value={studentData?.bloodGroup}
            readonly
            name="student.bloodGroup"
            label="Blood Groupt"
            size="large"
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormInput
            value={studentData?.presentAddress}
            readonly
            name="student.presentAddress"
            label="Present Address"
            size="large"
          />
        </Col>

        <Col span={12} style={{ margin: "10px 0" }}>
          <FormInput
            value={studentData?.permanentAddress}
            readonly
            name="student.permanentAddress"
            label="Permanent Address"
            size="large"
          />
        </Col>
      </Row>
    </div>
  );
};

export default StudentBasicReadonlyInfo;

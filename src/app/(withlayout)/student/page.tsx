"use client";
import StepperForm from "@/components/StepperForm/StepperForm";
import GuardianInfo from "@/components/StudentForms/GuardianInfo";
import LocalGuardianInfo from "@/components/StudentForms/LocalGuardianInfo";
import StudentBasicInfo from "@/components/StudentForms/StudentBasicInfo";
import GuardianReadonlyInfo from "@/components/StudentReadonlyInfo/GuardianReadonlyInfo";
import LocalGuardianReadonlyInfo from "@/components/StudentReadonlyInfo/LocalGuardiaReadonlyInfo";
import StudentBasicReadonlyInfo from "@/components/StudentReadonlyInfo/StudentBasicReadonlyInfo";
import StudentReadonlyInfo from "@/components/StudentReadonlyInfo/StudentReadonlyInfo";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const StudentPage = () => {
  const handleStudentSubmit = async (values: any) => {
    console.log("Hello");
  };
  const steps = [
    {
      title: "Student Information",
      content: <StudentReadonlyInfo />,
    },
    {
      title: "Basic Information",
      content: <StudentBasicReadonlyInfo />,
    },
    {
      title: "Guardian Information",
      content: <GuardianReadonlyInfo />,
    },
    {
      title: "Local Guardian Information",
      content: <LocalGuardianReadonlyInfo />,
    },
  ];
  const base = "profile";
  return (
    <div>
      <UMBreadCrumb
        items={[
          { label: `${base}`, link: `/${base}` },
          { label: "student-profile", link: `/student` },
        ]}
      />
      <h1 style={{ margin: "10px 0px" }}>Welcome to your student Profile</h1>
      <StepperForm
        persistKey="student-view-form"
        submitHandler={(value) => {
          handleStudentSubmit(value);
        }}
        steps={steps}
      />
    </div>
  );
};

export default StudentPage;

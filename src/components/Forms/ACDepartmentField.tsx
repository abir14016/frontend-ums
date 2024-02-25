import { useAcademicDepartmentsQuery } from "@/redux/api/academic/departmentApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import Loading from "@/app/loading";

type ACDepartmentFieldProps = {
  name: string;
  label?: string;
  required?: boolean;
};

const ACDepartmentField = ({
  name,
  label,
  required,
}: ACDepartmentFieldProps) => {
  const { data, isLoading } = useAcademicDepartmentsQuery({
    limit: 100,
    page: 1,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  const academicDepartments = data?.academicDepartments;
  const acDepartmentOptions = academicDepartments?.map((acDepartment: any) => {
    return {
      label: acDepartment?.title,
      value: acDepartment?.id,
    };
  });

  return (
    <>
      {required ? (
        <span
          style={{
            color: "red",
          }}
        >
          *
        </span>
      ) : null}
      <FormSelectField
        name={name}
        label={label}
        options={acDepartmentOptions as SelectOptions[]}
      />
    </>
  );
};

export default ACDepartmentField;

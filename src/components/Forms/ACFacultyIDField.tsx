import FormSelectField, { SelectOptions } from "./FormSelectField";
import Loading from "@/app/loading";
import { useAcademicFacultiesQuery } from "@/redux/api/academic/facultyApi";

type ACFacultyIDFieldProps = {
  name: string;
  label?: string;
  onChange: (e: any) => void;
};

const ACFacultyIDField = ({ name, label, onChange }: ACFacultyIDFieldProps) => {
  const { data, isLoading } = useAcademicFacultiesQuery({
    limit: 100,
    page: 1,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  const academicFaculties = data?.academicFaculties;
  const acFacultyOptions = academicFaculties?.map((acFaculty: any) => {
    return {
      label: acFaculty?.title,
      value: acFaculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label={label}
      options={acFacultyOptions as SelectOptions[]}
      handleChange={(e) => onChange(e)}
    />
  );
};

export default ACFacultyIDField;

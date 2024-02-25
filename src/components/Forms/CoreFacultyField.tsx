import { useFacultiesQuery } from "@/redux/api/facultyApi";
import FormSelectField, { SelectOptions } from "./FormSelectField";
import Loading from "@/app/loading";

type FacultyProps = {
  name: string;
  label?: string;
};

const CoreFacultyField = ({ name }: FacultyProps) => {
  const { data, isLoading } = useFacultiesQuery({
    limit: 100,
    page: 1,
  });
  if (isLoading) {
    return <Loading></Loading>;
  }
  const faculties = data?.faculties;
  const facultiesOptions = faculties?.map((faculty: any) => {
    // console.log(faculty);
    //ts-ignore
    return {
      label: `${faculty?.firstName} ${faculty?.middleName} ${faculty?.lastName}`,
      value: faculty?.id,
    };
  });

  return (
    <FormSelectField
      name={name}
      label="Faculty"
      options={facultiesOptions as any}
    />
  );
};

export default CoreFacultyField;

import * as yup from "yup";

export const facultySchema = yup.object().shape({
  faculty: yup
    .object()
    .shape({
      name: yup
        .object()
        .shape({
          firstName: yup.string().required("First name is required"),
          middleName: yup.string().required("Middle name is required"),
          lastName: yup.string().required("Last name is required"),
        })
        .required("Name is Required"),
      email: yup.string().email().required("Email is required"),
      contactNo: yup.string().required("Contact no. is required"),
      emergencyContactNo: yup
        .string()
        .required("Emenrgrncy ontact no. is required"),
      designation: yup.string().required("Designation is required"),
      academicFaculty: yup.string().required("Academic faculty is required"),
      academicDepartment: yup
        .string()
        .required("Academic department is required"),
    })
    .required("Faculty info is required"),
});

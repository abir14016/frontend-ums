import * as yup from "yup";

export const adminSchema = yup.object().shape({
  admin: yup
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
      managementDepartment: yup.string().required("Department is required"),
    })
    .required("Admin info is required"),
});

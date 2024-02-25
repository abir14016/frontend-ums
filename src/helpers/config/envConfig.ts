export const getBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3030/api/v1";
};

export const getDefaultStudentPassword = (): string => {
  return process.env.DEFAULT_STUDENT_PASS || "universityStudent123";
};

export const getDefaultFacultyPassword = (): string => {
  return process.env.DEFAULT_FACULTY_PASS || "universityFaculty123";
};

export const getDefaultAdminPassword = (): string => {
  return process.env.DEFAULT_ADMIN_PASS || "universityAdmin123";
};

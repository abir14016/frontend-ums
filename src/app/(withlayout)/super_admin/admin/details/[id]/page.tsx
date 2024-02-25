"use client";

import Loading from "@/app/loading";
import { useAdminQuery } from "@/redux/api/adminApi";
import { Avatar, Col, Descriptions, Divider, Row, Typography } from "antd";
const { Text } = Typography;
import { UserOutlined } from "@ant-design/icons";
import type { DescriptionsProps } from "antd";
import UMBreadCrumb from "@/components/ui/UMBreadCrumb";

const AdminDetails = ({ params }: { params: any }) => {
  const { id } = params;
  const { data: adminData, isLoading } = useAdminQuery(id);
  if (isLoading) {
    return <Loading></Loading>;
  }

  const name = `${adminData?.name?.firstName} ${adminData?.name?.middleName} ${adminData?.name?.lastName}`;

  //function for formating date of birth
  function formatDate(dateString: string) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const dateObj = new Date(dateString);
    const day = dateObj.getDate();
    const month = months[dateObj.getMonth()];
    const year = dateObj.getFullYear();

    // Pad single-digit day and month with leading zeros
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth =
      months.indexOf(month) + 1 < 10
        ? `0${months.indexOf(month) + 1}`
        : months.indexOf(month) + 1;

    return `${formattedDay}-${formattedMonth}-${year}`;
  }
  //function for formating date of birth

  const items: DescriptionsProps["items"] = [
    {
      key: "1",
      label: "Name",
      children: name,
    },
    {
      key: "2",
      label: "Admin ID",
      children: adminData?.id,
    },
    {
      key: "3",
      label: "Management Department",
      children: adminData?.managementDepartment?.title,
    },
    {
      key: "4",
      label: "Designation",
      children: adminData?.designation,
    },
    {
      key: "5",
      label: "Gender",
      children: adminData?.gender,
    },
    {
      key: "6",
      label: "Blood Groupt",
      children: adminData?.bloodGroup,
    },
    {
      key: "7",
      label: "Date Of Birth",
      children: formatDate(adminData?.dateOfBirth),
    },
    {
      key: "8",
      label: "Cntact No.",
      children: adminData?.contactNo,
    },
    {
      key: "9",
      label: "Emergency Contact No.",
      children: adminData?.emergencyContactNo,
    },
    {
      key: "10",
      label: "Present Address",
      children: adminData?.presentAddress,
    },
    {
      key: "11",
      label: "Permanent Address",
      children: adminData?.permanentAddress,
    },
  ];

  const base = "super_admin";

  return (
    <>
      <div>
        <UMBreadCrumb
          items={[
            { label: `${base}`, link: `/${base}` },
            { label: "admin", link: `/${base}/admin` },
          ]}
        />
        <h1 style={{ margin: "10px 0px" }}>Admin Details</h1>
        <Row style={{ margin: "15px 30px" }} align="middle">
          <Col>
            {adminData && adminData.profileImage ? (
              <Avatar size={170} shape="square" src={adminData.profileImage} />
            ) : (
              <Avatar size={170} shape="square" icon={<UserOutlined />} />
            )}
          </Col>
          <Col style={{ margin: "0 10px" }}>
            <div>
              <h1>{name}</h1>
              <h4>Department Of {adminData?.managementDepartment?.title}</h4>
              <h5>Admin ID: {adminData?.id}</h5>
              <Text type="secondary">{adminData?.email}</Text>
            </div>
          </Col>
        </Row>
        <Divider></Divider>
        <Descriptions title="Faculty Information" items={items} bordered />
      </div>
    </>
  );
};

export default AdminDetails;

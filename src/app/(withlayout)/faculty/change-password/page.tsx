"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { useChangePasswordMutation } from "@/redux/api/authApi";
import { Button, message } from "antd";

const ChangePassPage = () => {
  const [changePassword] = useChangePasswordMutation();
  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      const res = await changePassword(data).unwrap();
      if (typeof res === "object") {
        message.success("Password Changed Successfully");
      } else if (typeof res === "undefined") {
        message.error("Failed to change password!!!");
      }
    } catch (error) {
      message.error("Failed to change password");
    }
  };

  return (
    <div
      style={{ margin: "100px 0", display: "flex", justifyContent: "center" }}
    >
      <Form submitHandler={onSubmit}>
        <h3 style={{ marginBottom: "10px" }}>Reset Password</h3>
        <div style={{ margin: "5px 0" }}>
          <FormInput name="oldPassword" label="Old password" type="password" />
        </div>
        <div style={{ margin: "5px 0" }}>
          <FormInput name="newPassword" label="New password" type="password" />
        </div>
        <Button type="primary" htmlType="submit">
          submit
        </Button>
      </Form>
    </div>
  );
};

export default ChangePassPage;

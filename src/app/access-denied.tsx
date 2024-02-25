import { Button, Result } from "antd";
import Link from "next/link";

const AccessDenied = () => {
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary">
          <Link href={"http://localhost:3000"}>Back Home</Link>
        </Button>
      }
    />
  );
};

export default AccessDenied;

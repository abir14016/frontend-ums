import { Button, Result } from "antd";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <Button type="primary">
          <Link href={"http://localhost:3000"}>Back Home</Link>
        </Button>
      }
    />
  );
};

export default NotFoundPage;

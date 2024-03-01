import React from "react";
import { Form, Input, Button, Checkbox, Card, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
  LeftCircleFilled,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Admin, auth } from "../../utils/Items";
import { Token } from "../../utils/Storage";
import useAxiosPost from "../../axios/Uploader";
import AuthLayout from "../layout/AuthLayout";

const Login = () => {
  const { loading, data: logindata } = useAxiosPost();
  const navigate = useNavigate();
  const data = auth?.[0]; // Assuming `auth` is an array with at least one item
  const onFinish = (values) => {
    if (values?.username === data?.type) {
      // Using optional chaining to safely access `data`
      navigate("/");
      notification.info({ message: "Login successfully!" });
      localStorage.setItem("token", JSON.stringify(data));
      console.log("token", Token());
    } else if (values?.username === "admin") {
      const admindata = Admin?.map((item) => {
        return { ...item, name: values.username };
      });
      localStorage.setItem("token", JSON.stringify(admindata?.[0]));
      notification.info({ message: "Login successfully!" });
      navigate("/admin");
    } else {
      notification.error({
        message: "something went wrong",
        placement: "bottomRight",
      });
    }
  };
  React.useEffect(() => {
    if (logindata?.token) {
      localStorage.setItem("token", JSON.stringify(logindata?.token));
      navigate("/");
    }
  }, [logindata, navigate]);
  return (
    <div
      style={{
        width: "400px",
        height: "auto",
        margin: "auto",
        paddingTop: "3rem",
      }}
    >
      <Card style={{ opacity: "70%" }}>
        <div>
          <Form
            layout="vertical"
            name="normal_login"
            initialValues={{ remember: true }}
            style={{ maxWidth: 400, margin: "auto" }}
            onFinish={onFinish}
          >
            <Form.Item>
              <div>
                <LeftCircleFilled onClick={() => navigate(-1)} />
              </div>
              <div className="text-center font-bold text-xl pb-2.5">
                <h3>Login</h3>
              </div>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Form.Item>
            <Form.Item>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <Button htmlType="submit" loading={loading}>
                    {" "}
                    Log in
                  </Button>
                </div>
                <div>
                  <div>Donot have an account?</div>
                  <Link to="/signup" style={{ float: "right" }}>
                    {" "}
                    Sign Up
                  </Link>
                </div>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};
const ExportedLogin = () => (
  <AuthLayout>
    <Login />
  </AuthLayout>
);

export default ExportedLogin;

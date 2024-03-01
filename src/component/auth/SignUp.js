import React from "react";
import { Form, Input, Button, Card } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import AuthLayout from "../layout/AuthLayout";
const SignupLayout = () => {
  return (
    <div
      style={{
        width: "500px",
        height: "auto",
        margin: "auto",
        padding: "50px",
        paddingTop: "3rem",
      }}
    >
      <Card style={{ opacity: "70%" }}>
        <Form
          layout="vertical"
          name="normal_signup"
          initialValues={{ remember: true }}
          style={{ maxWidth: 300, margin: "auto" }}
        >
          <Form.Item>
            <h2>Sign Up</h2>
          </Form.Item>
          <Form.Item
            name="First Name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="First Name"
            />
          </Form.Item>
          <Form.Item
            name="Last Name"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Last Name"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            dependencies={["password"]}
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("The two passwords do not match!");
                },
              }),
            ]}
          >
            <Input
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
            />
          </Form.Item>

          <Form.Item>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <Button className="bg-blue-400 text-blue-950" htmlType="submit">
                  Sign Up
                </Button>
              </div>
              <div>
                <div>Already have an account?</div>
                <Link to="/login" style={{ float: "right" }}>
                  {" "}
                  Login
                </Link>
              </div>
            </div>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

const ExportedSignUp = () => (
  <AuthLayout>
    <SignupLayout />
  </AuthLayout>
);

export default ExportedSignUp;

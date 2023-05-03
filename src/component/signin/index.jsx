import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./signin.css";
import SuccessNotification from "../notification/SuccessNotification";
import AlertNotification from "../notification/AlertNotification";
import { loginUser } from "../../redux/actions";

const SignIn = (values) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [dataUsers, setDataUsers] = useState([]);
  const [showSuccsessNotification, setShowSuccessNotification] =
    useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const api = axios.create({
    baseURL: "http://localhost:3005",
  });
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const getPosts = async () => {
    try {
      const response = await api.get("/users");
      setDataUsers(response.data);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  const onFinish = (values) => {
    const emailUser = values.username;
    const passwordUser = values.password;

    const foundUser = dataUsers.find(
      (user) => user.email === emailUser && user.password === passwordUser
    );

    if (foundUser) {
      dispatch(loginUser(foundUser));

      setShowSuccessNotification(true);
    } else {
      setShowAlert(true);
      console.log("sao ko chay");
    }
  };

  return (
    <div className="signInForm">
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Đăng nhập
          </Button>
        </Form.Item>
      </Form>
      {showSuccsessNotification && (
        <SuccessNotification
          status="success"
          title="Chúc mừng bạn đã đăng nhập thành công"
        />
      )}
      {showAlert && (
        <AlertNotification description="Tên tài khoản hoặc Mật khẩu không đúng" />
      )}
    </div>
  );
};

export default SignIn;

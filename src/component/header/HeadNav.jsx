import React, { useState } from "react";
import { Menu, Modal } from "antd";
import {
  ShoppingCartOutlined,
  HomeOutlined,
  HomeFilled,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./HeadNav.css";
import Login from "../login";
import SignIn from "../signin";

const HeadNav = () => {
  const [visible, setVisible] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };
  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const showModal = (type) => {
    setModalType(type);
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  return (
    <div>
      <Menu
        className="appMenu"
        mode="horizontal"
        items={[
          {
            label: "Home",
            key: "home",
            icon: <HomeFilled />,
          },
          {
            label: "Phim lẻ",
            key: "men",
            children: [
              {
                label: "Phim hành động Nước ngoài",
                key: "action-ncNgoai",
              },
              {
                label: "Phim hành động Việt Nam",
                key: "action-vn",
              },
              {
                label: "Phim hành động Khác",
                key: "action-other",
              },
            ],
          },
          {
            label: "Phim dài tập",
            key: "phimBo",
            children: [
              {
                label: "Phim dài tập Việt Nam",
                key: "phimBo-VN",
              },
              {
                label: "Phim dài tập Trung Quốc",
                key: "phimBo-TQ",
              },
              {
                label: "Phim dài tập Hàn Quốc",
                key: "phimBo-HQ",
              },
              {
                label: "Phim dài tập Mỹ-Châu Âu",
                key: "phimBo-my",
              },
            ],
          },
          {
            label: "Phim trẻ em",
            key: "phimTreEm",
          },
          {
            className: "signIn",
            label: "Đăng ký",
            key: "signUp",
            onClick: () => showModal("signup"),
          },
          {
            className: "logIn",
            label: "Đăng nhập",
            key: "signIn",
            onClick: () => showModal("signIn"),
          },

          {
            className: "logOut",
            label: "Đăng xuất",
            key: "signOut",
            onClick: () => handleLogout(),
          },
        ]}
      />

      <Modal
        title={modalType === "signup" ? "Đăng ký" : "Đăng nhập"}
        open={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {modalType === "signup" ? <Login /> : <SignIn />}
      </Modal>
    </div>
  );
};

export default HeadNav;

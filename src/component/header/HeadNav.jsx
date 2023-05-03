import React, { useEffect, useState } from "react";
import { Menu, Modal } from "antd";
import { Routes, Route, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  ShoppingCartOutlined,
  SearchOutlined,
  HomeOutlined,
  HomeFilled,
  UserOutlined,
} from "@ant-design/icons";
import "antd/dist/reset.css";
import "./HeadNav.css";

import AvatarUser from "../../Avatar";

const HeadNav = () => {
  const intinitalValue = useSelector((state) => state.auth.loggedIn);
  const [loggedIn, setLoggedIn] = useState(intinitalValue);
  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = () => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setLoggedIn(true);
    }
  };
  const accountMenuItems = loggedIn
    ? [
        {
          className: "logOut",
          label: "Đăng xuất",
          key: "signOut",
        },
      ]
    : [
        {
          className: "signIn",
          label: <NavLink to={"/signup"}>Đăng ký</NavLink>,
          key: "signUp",
        },
        {
          className: "logIn",
          label: <NavLink to={"/signin"}>Đăng nhập</NavLink>,
          key: "signIn",
        },
      ];

  return (
    <div className="appMenu">
      <Menu
        className="menuHead"
        mode="horizontal"
        items={[
          {
            label: <NavLink to={"/"}>Home</NavLink>,
            key: "/",
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
          ...accountMenuItems,
          {
            label: <SearchOutlined />,
            key: "search",
          },
          {
            label: (
              <NavLink to={"/admin"}>
                <AvatarUser />
              </NavLink>
            ),
            key: "user",
          },
        ]}
      />
    </div>
  );
};

export default HeadNav;

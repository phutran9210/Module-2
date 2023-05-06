import React, { useEffect, useState } from "react";
import { Menu, Modal, AutoComplete } from "antd";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../../redux/actions";
import { SearchOutlined, HomeFilled } from "@ant-design/icons";
import SearchNavbar from "../find/SearchNavbar";

import "antd/dist/reset.css";
import "./HeadNav.css";

import AvatarUser from "../../Avatar";

const HeadNav = () => {
  const intinitalValue = useSelector((state) => state.auth.loggedIn);
  const [loggedIn, setLoggedIn] = useState(intinitalValue);
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userRole = useSelector((state) => state.auth.user?.role);
  console.log("lấy role về :", userRole);

  const handleAvatarClick = () => {
    if (userRole === "admin" || userRole === "mod") {
      navigate("/admin");
    } else if (userRole === "user") {
      navigate("/user");
    }
  };

  useEffect(() => {
    checkLoginStatus();
    console.log("run ????");
  }, [intinitalValue]);

  const handleSignupClick = () => {
    if (location.pathname === "/signup") {
      navigate("/");
    } else {
      navigate("/signup");
    }
  };
  const handleSigninClick = () => {
    if (location.pathname === "/signin") {
      navigate("/");
    } else {
      navigate("/signin");
    }
  };

  const checkLoginStatus = () => {
    const loggedUser = localStorage.getItem("loggedUser");
    if (loggedUser) {
      setLoggedIn(true);
    }
  };
  const confirmLogout = () => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn thoát?",

      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        handleLogout();
      },
    });
  };
  const handleLogout = () => {
    dispatch(logoutUser());
    setLoggedIn(false);
  };
  const accountMenuItems = loggedIn
    ? [
        {
          className: "logOut",
          label: "Đăng xuất",
          key: "signOut",
          onClick: confirmLogout,
        },
      ]
    : [
        {
          className: "signIn",
          label: <NavLink to={"/signup"}>Đăng ký</NavLink>,
          key: "signUp",
          onClick: handleSignupClick,
        },
        {
          className: "logIn",
          label: <NavLink to={"/signin"}>Đăng nhập</NavLink>,
          key: "signIn",
          onClick: handleSigninClick,
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
            key: "phimLe",
            children: [
              {
                label: "Phim Hành Động",
                key: "action-ncNgoai",
              },
              {
                label: "Phim Giả Tưởng",
                key: "action-vn",
              },
              {
                label: "Phim Giật Gân",
                key: "action-other",
              },
              {
                label: "Phim Phiêu Lưu",
                key: "Aventure",
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
            label: <SearchNavbar />,
            key: "search",
          },
          {
            label: <AvatarUser />,
            onClick: handleAvatarClick,
            key: "user",
          },
        ]}
      />
    </div>
  );
};

export default HeadNav;

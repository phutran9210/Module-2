import React from "react";
import { AudioOutlined } from "@ant-design/icons";
import { Input } from "antd";
import { useDispatch } from "react-redux";
import { searchMovies } from "../../redux/actions/managerMovies";
const { Search } = Input;
const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);
const FindMovieAd = () => {
  const dispatch = useDispatch();
  const handleSearch = (value) => {
    dispatch(searchMovies(value));
  };
  return (
    <Search
      style={{
        display: "flex",
        justifyContent: "flex-start",
        marginTop: 16,
        marginBottom: 16,
      }}
      placeholder="Nhập tên phim tại đây"
      enterButton="Search"
      size="large"
      suffix={suffix}
      onSearch={handleSearch}
    />
  );
};

export default FindMovieAd;

import { useEffect, useState } from "react";
import { Table, Button, Tag, Typography, Modal, Switch } from "antd";

import { fetchApiData } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMovie,
  removeVideoFromApi,
} from "../../../redux/actions/managerMovies";
import EditMovie from "./EditMovie";
import FindMovieAd from "../../find/findMovieAd";
const { Text, Title } = Typography;

function renderGenres(genres) {
  return genres.map((genre, index) => (
    <Tag key={index} color={getTagColor(genre)}>
      {genre}
    </Tag>
  ));
}

function getTagColor(genre) {
  switch (genre) {
    case "Action":
      return "blue";
    case "Comedy":
      return "red";
    case "Drama":
      return "volcano";
    case "Horror":
      return "orange";
    case "Sci-Fi":
      return "gold";
    case "Romance":
      return "yellow";
    case "Documentary":
      return "lime";
    case "Animation":
      return "green";
    case "Adventure":
      return "cyan";
    case "Thriller":
      return "blue";
    case "Biography":
      return "geekblue";
    case "Crime":
      return "purple";
    case "Fantasy":
      return "magenta";
    case "History":
      return "#87e8de";
    default:
      return "gray";
  }
}
const VideoTable = () => {
  const dispatch = useDispatch();
  const dataMovie = useSelector((state) => state.apiData.data);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [movieUpdated, setMovieUpdated] = useState(false);

  useEffect(() => {
    dispatch(fetchApiData());
    setMovieUpdated(false);
    console.log("run ????");
  }, [movieUpdated]);

  const searchText = useSelector((state) => state.video.searchText);

  const filteredMovies = searchText
    ? dataMovie.filter((movie) =>
        movie.Title.toLowerCase().includes(searchText.toLowerCase())
      )
    : dataMovie;
  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: "Bạn có chắc chắn muốn xóa video này?",
      content: "Hành động này không thể hoàn tác.",
      okText: "Xác nhận",
      okType: "danger",
      cancelText: "Hủy bỏ",
      onOk() {
        removeMovie(id);
      },
    });
  };
  const removeMovie = (id) => {
    dispatch(removeVideoFromApi(id));
    setMovieUpdated(true);
  };
  const editMovie = (movie) => {
    setCurrentMovie(movie);
    setEditModalVisible(true);
  };
  const handleEditModalCancel = () => {
    setEditModalVisible(false);
  };
  const handleEditMovie = (values) => {
    const movieId = currentMovie.id;

    dispatch(updateMovie(movieId, values));
    setEditModalVisible(false);
    setMovieUpdated(true);
  };
  const handleSwitchChange = (checked, record) => {
    console.log("Switch state:", checked, "Record:", record);
  };

  const columns = [
    {
      title: () => <Title level={4}>Tên phim</Title>,
      dataIndex: "Title",
      render: (title) => <Text strong>{title}</Text>,
      width: "20%",
    },
    {
      title: () => <Title level={4}>Thể loại</Title>,
      dataIndex: "Genre",

      render: renderGenres,
      filters: [
        {
          text: "Hành động",
          value: "Action",
        },
        {
          text: "Hài hước",
          value: "Comedy",
        },
        {
          text: "Tâm lý",
          value: "Drama",
        },
        {
          text: "Kinh dị",
          value: "Horror",
        },
        {
          text: "Khoa học viễn tưởng",
          value: "Sci-Fi",
        },
        {
          text: "Lãng mạn",
          value: "Romance",
        },
        {
          text: "Tài liệu",
          value: "Documentary",
        },
        {
          text: "Hoạt hình",
          value: "Animation",
        },
        {
          text: "Phiêu lưu",
          value: "Adventure",
        },
        {
          text: "Giật gân",
          value: "Thriller",
        },
        {
          text: "Khoa học",
          value: "Biography",
        },
        {
          text: "Tội phạm",
          value: "Crime",
        },
      ],
      onFilter: (value, record) => record.Genre.includes(value),
      width: "20%",
    },
    {
      title: () => <Title level={4}>Tóm tắt nhanh</Title>,
      dataIndex: "Plot",
    },
    {
      title: () => <Title level={4}>Hiển thị</Title>,
      dataIndex: "isVisible",
      render: (isVisible, record) => (
        <Switch
          checked={isVisible}
          onChange={(checked) => handleSwitchChange(checked, record)}
        />
      ),
      width: "10%",
    },
    {
      title: () => <Title level={4}>Chỉnh sửa</Title>,
      dataIndex: "",
      key: "edit",
      render: (text, record) => (
        <Button type="primary" onClick={() => editMovie(record)}>
          Chỉnh sửa
        </Button>
      ),
    },
    {
      title: () => <Title level={4}>Xóa</Title>,
      dataIndex: "",
      key: "delete",
      render: (text, record) => (
        <Button
          type="primary"
          danger
          onClick={() => showDeleteConfirm(record.id)}
        >
          Xóa
        </Button>
      ),
    },
  ];
  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const handleTableChange = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      ...sorter,
    });

    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };
  return (
    <>
      <FindMovieAd />
      <Table
        columns={columns}
        rowKey={(record) => record.imdbID}
        dataSource={filteredMovies}
        pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
      />

      <EditMovie
        visible={editModalVisible}
        onCancel={handleEditModalCancel}
        // onEditMovie={handleEditMovie}
        currentMovie={currentMovie}
        onOk={handleEditMovie}
      />
    </>
  );
};
export default VideoTable;

import { useEffect, useState } from "react";
import { Table } from "antd";

import { fetchApiData } from "../../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
const columns = [
  {
    title: "Tên phim",
    dataIndex: "Title",

    width: "20%",
  },
  {
    title: "Thể loại",
    dataIndex: "Type",
    filters: [
      {
        text: "Movies",
        value: "movie",
      },
      {
        text: "Series",
        value: "series",
      },
    ],
    width: "20%",
  },
  {
    title: "Tóm tắt nhanh",
    dataIndex: "Plot",
  },
];
const VideoTable = () => {
  const dispatch = useDispatch();
  const dataMovie = useSelector((state) => state.apiData.data);

  useEffect(() => {
    if (dataMovie.length === 0) {
      dispatch(fetchApiData());
    }
  }, []);

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
    <Table
      columns={columns}
      rowKey={(record) => record.imdbID}
      dataSource={dataMovie}
      pagination={tableParams.pagination}
      // loading={loading}
      onChange={handleTableChange}
    />
  );
};
export default VideoTable;

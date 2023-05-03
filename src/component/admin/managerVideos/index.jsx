import { Tabs } from "antd";
import AddMovies from "./AddMovies";
import VideoTable from "./Manager";
// const onChange = (key) => {
//   console.log(key);
// };
const items = [
  {
    key: "1",
    label: `Quản lý phim`,
    children: <VideoTable />,
  },
  {
    key: "2",
    label: `Thêm mới phim`,
    children: <AddMovies />,
  },
  {
    key: "3",
    label: `Tab 3`,
    children: `Content of Tab Pane 3`,
  },
];
const Manager = () => <Tabs defaultActiveKey="1" items={items} />;
export default Manager;

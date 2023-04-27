import { UserOutlined } from "@ant-design/icons";
import { Avatar, Badge, Space } from "antd";
const AvatarUser = () => (
  <Space size={24}>
    <Badge count={0}>
      <Avatar shape="square" icon={<UserOutlined />} />
    </Badge>
  </Space>
);
export default AvatarUser;

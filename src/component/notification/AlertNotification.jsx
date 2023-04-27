import { Alert, Space } from "antd";
import React from "react";

const AlertNotification = ({ description }) => {
  return (
    <Space
      direction="vertical"
      style={{
        width: "100%",
      }}
    >
      <Alert
        message="Đã xảy ra lỗi "
        description={description || "Đã xảy ra lỗi"}
        type="error"
        showIcon
      />
    </Space>
  );
};

export default AlertNotification;

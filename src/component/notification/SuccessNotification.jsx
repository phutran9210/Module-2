import { Button, Result } from "antd";
import "./successNotification.css";
import { useNavigate } from "react-router-dom";
const SuccessNotification = () => {
  const history = useNavigate();
  const handleHome = () => {
    history("/");
  };

  return (
    <div className="success-notification">
      <Result
        className="notification-content"
        status="success"
        title="Chúc mừng bạn đã đăng ký thành công"
        subTitle="Vui lòng quay trở về trang chủ để đăng nhập"
        extra={[
          <Button type="primary" key="console" onClick={handleHome}>
            Quay trở về trang chủ
          </Button>,
        ]}
      />
    </div>
  );
};
export default SuccessNotification;

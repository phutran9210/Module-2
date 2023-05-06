// User.js
import React from "react";
import { Card } from "antd";
import { useSelector } from "react-redux";

const { Meta } = Card;

const User = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <Card
      hoverable
      style={{ width: 240 }}
      cover={
        <img
          alt="profile_picture"
          src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
        />
      }
    >
      <Meta title={user.nickname} description={`Email: ${user.email}`} />
      <p>Residence: {user.residence}</p>
      <p>
        Phone: {user.prefix} {user.phone}
      </p>
      <p>Gender: {user.gender}</p>
      <p>Role: {user.role}</p>
      <p>Registered on: {user.timeRegister}</p>
    </Card>
  );
};

export default User;

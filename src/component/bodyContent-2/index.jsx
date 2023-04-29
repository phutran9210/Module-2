import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Card, List } from "antd";
import "../bodyContent.css";
import axios from "axios";

const { Meta } = Card;
const BodyContent2 = () => {
  const [movieData, setMovieData] = useState([]);
  const api = axios.create({
    baseURL: "http://localhost:3005",
  });
  const getPosts = async () => {
    try {
      const response = await api.get("/tv_shows");
      setMovieData(response.data);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div id="bodycontent2" className="body-content">
      <h2>PHIM BỘ VIỆT NAM</h2>
      <List
        grid={{ gutter: 16, column: 5 }}
        dataSource={movieData}
        renderItem={(movieData) => {
          return (
            <List.Item className="custom-list-item">
              <Card
                className="custom-card"
                hoverable
                style={{
                  width: 240,
                }}
                cover={
                  <img
                    key={movieData.id}
                    alt={movieData.id}
                    src={movieData.image_url}
                  />
                }
              >
                <Meta title={movieData.title} description={movieData.actors} />
              </Card>
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
};
export default BodyContent2;

import React, { useEffect, useState } from "react";
import "antd/dist/reset.css";
import { Card, List } from "antd";
import "../bodyContent.css";
import axios from "axios";

const { Meta } = Card;
const BodyContent1 = () => {
  const [movieData, setMovieData] = useState([]);
  const api = axios.create({
    baseURL: "http://localhost:3005",
  });
  const getPosts = async () => {
    try {
      const response = await api.get("/movies");
      setMovieData(response.data);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);
  console.log(movieData);
  return (
    <div id="bodycontent1" className="body-content">
      <h2>PHIM HÀNH ĐỘNG</h2>
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
                    key={movieData.imdbID}
                    alt={movieData.imdbVotes}
                    src={movieData.Poster}
                  />
                }
              >
                <Meta title={movieData.Title} description={movieData.Actors} />
              </Card>
            </List.Item>
          );
        }}
      ></List>
    </div>
  );
};
export default BodyContent1;

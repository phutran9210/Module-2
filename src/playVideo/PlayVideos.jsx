import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

import {
  Descriptions,
  Image,
  Typography,
  Button,
  Row,
  Col,
  message,
} from "antd";
import axios from "axios";
import { useParams } from "react-router";
import "./playVideo.css";
const { Title } = Typography;
const PlayVideos = () => {
  const [isTrailer, setIstrailer] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const toggleTrailer = () => {
    setIstrailer(!isTrailer);
  };
  useEffect(() => {
    async function fetchMovie() {
      try {
        const response = await axios.get(
          `http://localhost:3005/movies/${movieId}`
        );
        setMovie(response.data);
      } catch (error) {
        message.error("Error fetching movie:", error);
      }
    }
    fetchMovie();
  }, [movieId]);
  console.log(movieId);
  if (!movie) {
    return <div>Loading...</div>;
  }

  const videoUlr = isTrailer ? movie.VideoURL : movie.Videos;

  return (
    <div className="watch-movie">
      <h1>
        {movie.Title} ({movie.Year})
      </h1>

      <Descriptions title="Thông tin phim">
        <Descriptions.Item label="Director">{movie.Director}</Descriptions.Item>
        <Descriptions.Item label="Actors">{movie.Actors}</Descriptions.Item>
        <Descriptions.Item label="Plot">{movie.Plot}</Descriptions.Item>
        <Descriptions.Item label="IMDb Rating">
          {movie.imdbRating}
        </Descriptions.Item>
      </Descriptions>
      <div className="player-wrapper">
        <ReactPlayer
          className="react-player"
          url={videoUlr}
          width="80%"
          height="650px"
          controls
          playing={true}
        />
      </div>
      <div className="player-controls">
        <Button type="primary" onClick={toggleTrailer}>
          {isTrailer ? "Xem phim" : "Xem trên lơ"}
        </Button>
      </div>
      <hr />
      <Title level={2}>Chi tiết phim </Title>
      <div>
        {movie.Images.map((image, index) => (
          <Row key={index}>
            <Col
              xs={{ span: 24, offset: 0 }}
              sm={{ span: 22, offset: 1 }}
              md={{ span: 20, offset: 2 }}
              lg={{ span: 18, offset: 3 }}
              xl={{ span: 16, offset: 4 }}
              xxl={{ span: 14, offset: 5 }}
            >
              <Image
                className="img"
                width="100%"
                height="auto"
                key={index}
                src={image}
                alt={`Image ${index}`}
              />
            </Col>
          </Row>
        ))}
      </div>
    </div>
  );
};

export default PlayVideos;

import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useSelector, useDispatch } from "react-redux";
import { Descriptions, Image, Typography, Button, Row, Col } from "antd";
import { fetchApiData } from "../redux/actions";
import { setSelectedMovieId } from "../redux/actions";
import "./playVideo.css";
const { Title } = Typography;
const PlayVideos = ({ movie }) => {
  const [isTrailer, setIstrailer] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const dispatch = useDispatch();
  const movieData = useSelector((state) => state.apiData.data);
  const toggleTrailer = () => {
    setIstrailer(!isTrailer);
  };
  useEffect(() => {
    const storedLocal = localStorage.getItem("selectedMovieId");
    if (storedLocal) {
      dispatch(setSelectedMovieId(storedLocal));
    }
    dispatch(fetchApiData());
  }, [dispatch]);
  const selectedMovieId = useSelector((state) => state.selectedMovieId);
  const selectedMovie = movieData.find(
    (movie) => movie.imdbID === selectedMovieId
  );

  if (!selectedMovie) {
    return <div>Loading...</div>;
  }
  console.log(selectedMovie.Video);
  const videoUlr = isTrailer ? selectedMovie.VideoURL : selectedMovie.Video;

  return (
    <div className="watch-movie">
      <h1>
        {selectedMovie.Title} ({selectedMovie.Year})
      </h1>

      <Descriptions title="Thông tin phim">
        <Descriptions.Item label="Director">
          {selectedMovie.Director}
        </Descriptions.Item>
        <Descriptions.Item label="Actors">
          {selectedMovie.Actors}
        </Descriptions.Item>
        <Descriptions.Item label="Plot">{selectedMovie.Plot}</Descriptions.Item>
        <Descriptions.Item label="IMDb Rating">
          {selectedMovie.imdbRating}
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
        <Button type="primary" onClick={toggleTrailer}>
          {isTrailer ? "Xem phim" : "Xem trên lơ"}
        </Button>
      </div>
      <hr />
      <Title level={2}>Chi tiết phim </Title>
      <div>
        {selectedMovie.Images.map((image, index) => (
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

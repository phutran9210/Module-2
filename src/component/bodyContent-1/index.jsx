import React, { useEffect, useState } from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import "../bodyContent.css";
import axios from "axios";
import "./bodyContent-1.css";
import { setSelectedMovieId } from "../../redux/actions";
import { useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router";

const btnStyleNavi = {
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  borderColor: "transparent",
  marginRight: "10px",
  transition: "all 0.3s ease",
};

const handleMouseEnter = (e) => {
  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  e.target.style.transform = "scale(1.1)";
};

const handleMouseLeave = (e) => {
  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
  e.target.style.transform = "scale(1)";
};
const { Meta } = Card;
const BodyContent1 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const visibleMovies = 8;
  const maxPosition = (movieData.length - visibleMovies) * 260;
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

  const handleClick = (selectedMovie) => {
    dispatch(setSelectedMovieId(selectedMovie.imdbID));
    localStorage.setItem("selectedMovieId", selectedMovie.imdbID);
    navigate("/play");
  };
  const handleScroll = (direction) => {
    const scrollAmount = 260;
    const newPosition = scrollPosition + direction * scrollAmount;
    if (newPosition >= 0 && newPosition <= maxPosition) {
      setScrollPosition(newPosition);
    }
  };

  return (
    <div id="bodycontent1" className="body-content">
      <h2>PHIM HÀNH ĐỘNG</h2>
      <Button
        icon={<LeftOutlined />}
        type="primary"
        onClick={() => handleScroll(-1)}
        style={btnStyleNavi}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></Button>
      <div
        className="horizontal-scroll"
        style={{ transform: `translateX(-${scrollPosition}px)` }}
      >
        {movieData.map((movie) => (
          <Card
            key={movie.imdbID}
            className="custom-card"
            hoverable
            style={{
              width: 240,
            }}
            cover={
              <img
                key={movie.imdbID}
                alt={movie.imdbVotes}
                src={movie.Poster}
              />
            }
            onClick={() => handleClick(movie)}
          >
            <Meta title={movie.Title} description={movie.Actors} />
          </Card>
        ))}
      </div>
      <Button
        icon={<RightOutlined />}
        type="primary"
        onClick={() => handleScroll(1)}
        style={btnStyleNavi}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      ></Button>
    </div>
  );
};
export default BodyContent1;

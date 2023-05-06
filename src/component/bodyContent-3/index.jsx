import React, { useEffect, useState } from "react";
import { RightOutlined, LeftOutlined } from "@ant-design/icons";
import { Card, Button } from "antd";
import "../bodyContent.css";

import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../redux/actions";
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
const BodyContent3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [scrollPosition, setScrollPosition] = useState(0);
  useEffect(() => {
    dispatch(fetchApiData());
    console.log("run???");
  }, []);

  const dataMovie = useSelector((state) => state.apiData.data);
  const actionMovie = dataMovie.filter((movie) => {
    return movie.Genre.some((tag) => {
      return tag === "Crime";
    });
  });

  const visibleMovies = 8;
  const maxPosition = (actionMovie.length - visibleMovies) * 260;

  const handleClick = (movieId) => {
    navigate(`/play/${movieId}`);
  };
  const handleScroll = (direction) => {
    const scrollAmount = 260;
    const newPosition = scrollPosition + direction * scrollAmount;
    if (newPosition >= 0 && newPosition <= maxPosition) {
      setScrollPosition(newPosition);
    }
  };

  return (
    <div id="bodycontent3" className="body-content">
      <h2>PHIM GIẢ TƯỞNG</h2>
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
        {actionMovie.map((movie) => (
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
            onClick={() => handleClick(movie.id)}
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
export default BodyContent3;

import React, { useEffect, useState } from "react";
import { Carousel } from "antd";
import "antd/dist/reset.css";
import "./Carosel.css";
import axios from "axios";

const contentStyle = {
  // position: "relative",
  width: "100%",
  height: "100vh",
  // fontSize: "1rem",
  // textAlign: "left",
  // fontWeight: "bold",
  // color: "white",
  // backgroundColor: "rgba(0, 0, 0, 0.5)",
  // borderRadius: "10px",
  // padding: "10px",
};

// const descriptionStyle = {
//   position: "absolute",
//   marginTop: "1rem",
//   fontSize: "1rem",
//   top: "20px",
//   left: "20px",
// };
const Carosel = () => {
  const [carouselData, setCarouselData] = useState([]);
  const api = axios.create({
    baseURL: "http://localhost:3005",
  });
  const getPosts = async () => {
    try {
      const response = await api.get("/carousel");
      setCarouselData(response.data);
    } catch (error) {
      console.error("Error getting posts:", error);
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div id="carousel-section">
      <Carousel autoplay>
        {carouselData.map((item) => (
          <div key={item.id}>
            <h3 style={contentStyle}>
              <img src={item.imgUlr} alt={item.imgDes} />
              {/* <p style={descriptionStyle}>{item.Plot}</p> */}
            </h3>
          </div>
        ))}
      </Carousel>
    </div>
  );
};
export default Carosel;

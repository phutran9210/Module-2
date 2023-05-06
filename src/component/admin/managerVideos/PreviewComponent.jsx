import React from "react";
import { Image, Modal } from "antd";
import ReactPlayer from "react-player";
const PreviewComponent = ({ data, visible, onCancel }) => {
  if (!data) {
    return null;
  }
  return (
    <Modal
      title="Xem trước khi tải lên"
      open={visible}
      onCancel={onCancel}
      footer={null}
      width="80%"
    >
      <div>
        <p>Tên phim : {data.Title}</p>
        <p>Thể loại : {data.Genre}</p>
        <p>Ngày phát hành : {new Date(data.Released).toLocaleDateString()}</p>
        <p>Đạo diễn : {data.Director}</p>
        <p>Biên kịch : {data.Writer}</p>
        <p>Diễn viên : {data.Actors}</p>
        <p>Tóm tắt phim : {data.Plot}</p>
        <p>Ngôn ngữ : {data.Language}</p>
        <p>Quốc gia : {data.Country}</p>
        <p>Giải thưởng : {data.Awards}</p>
        <p>Ảnh Poster : </p>
        <ul>
          <Image width={200} src={data.Poster} />
        </ul>
        <p>Video Trailer : {data.VideoURL}</p>
        <ReactPlayer
          className="react-player"
          url={data.VideoURL}
          width="80%"
          height="650px"
          controls
          playing={false}
        />
        <p>Phim :</p>

        {data.Videos.map((vid, index) => (
          <div key={index}>
            <p>
              {" "}
              <b>Soure</b> : {vid}
            </p>
            <ReactPlayer
              key={index}
              className="react-player"
              url={vid}
              width="80%"
              height="650px"
              controls
              playing={false}
            />
          </div>
        ))}

        <p>Kiểm duyệt : {data.Rated}</p>
        <p>Thời lượng phim : {data.Runtime}</p>
        <p>Số tập : {data.NumberOfFilm}</p>
        <p>Hiển thị :{data.isVisible ? "Có" : "Không"} </p>

        <p>ID phim : {data.imdbID}</p>
        <p>Hình ảnh:</p>
        <ul>
          {data.Images.map((image, index) => (
            <Image key={index} width={200} src={image} />
          ))}
        </ul>
      </div>
    </Modal>
  );
};

export default PreviewComponent;

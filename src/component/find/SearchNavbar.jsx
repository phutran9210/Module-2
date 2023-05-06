import React, { useEffect, useState } from "react";
import { AutoComplete } from "antd";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchApiData } from "../../redux/actions";

const SearchNavbar = () => {
  const [inputValue, setInputValue] = useState("");

  const dataMovie = useSelector((state) => state.apiData.data);
  const navigate = useNavigate();
  const dispath = useDispatch();
  useEffect(() => {
    dispath(fetchApiData());
  }, []);
  const handleSearchSelect = (value, option) => {
    const movieId = option.key;
    navigate(`/play/${movieId}`);
  };

  const handleSearchInput = (value) => {
    setInputValue(value);
  };

  const filteredMovies = inputValue
    ? dataMovie.filter((movie) =>
        movie.Title.toLowerCase().includes(inputValue.toLowerCase())
      )
    : [];

  const autoCompleteOptions = filteredMovies.map((movie) => ({
    key: movie.id,
    value: movie.Title,
  }));

  return (
    <AutoComplete
      options={autoCompleteOptions}
      onSelect={handleSearchSelect}
      onSearch={handleSearchInput}
      placeholder="Tìm kiếm phim..."
      style={{ width: 200 }}
    />
  );
};

export default SearchNavbar;

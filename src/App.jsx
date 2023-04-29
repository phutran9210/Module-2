import React, { useEffect, useState } from "react";

import HeadNav from "./component/header/HeadNav";
import Carosel from "./component/carosel/Carosel";
import BodyContent1 from "./component/bodyContent-1";
import BodyContent2 from "./component/bodyContent-2";
import { Route, Routes } from "react-router-dom";
import SignIn from "./component/signin";
import Login from "./component/login";
import Footer from "./component/footer";
import PlayVideos from "./playVideo/PlayVideos";
import AdminPage from "./component/admin";
const App = () => {
  const HomePage = () => (
    <>
      <Carosel />
      <BodyContent1 />
      <BodyContent2 />
      <Footer />
    </>
  );
  return (
    <div className="app">
      <HeadNav />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<Login />}></Route>
        <Route path="/play" element={<PlayVideos />}></Route>
        <Route path="/admin" element={<AdminPage />}></Route>
      </Routes>
    </div>
  );
};

export default App;

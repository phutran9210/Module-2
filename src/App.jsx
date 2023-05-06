import React, { useEffect, useState } from "react";

import HeadNav from "./component/header/HeadNav";
import Carosel from "./component/carosel/Carosel";
import BodyContent1 from "./component/bodyContent-1";
import BodyContent2 from "./component/bodyContent-2";
import BodyContent3 from "./component/bodyContent-3";
import { Route, Routes, useLocation } from "react-router-dom";
import SignIn from "./component/signin";
import Login from "./component/login";
import Footer from "./component/footer";
import PlayVideos from "./playVideo/PlayVideos";
import AdminPage from "./component/admin";
import User from "./component/user/User";
const App = () => {
  const HomePage = () => (
    <>
      <Carosel />
      <BodyContent1 />
      <BodyContent2 />
      <BodyContent3 />
      <Footer />
    </>
  );
  const location = useLocation();
  return (
    <div className="app">
      {location.pathname !== "/admin" && <HeadNav />}
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/signin" element={<SignIn />}></Route>
        <Route path="/signup" element={<Login />}></Route>

        <Route path="/admin" element={<AdminPage />}></Route>
        <Route path="/user" element={<User />}></Route>
        <Route path="/play/:movieId" element={<PlayVideos />} />
      </Routes>
    </div>
  );
};

export default App;

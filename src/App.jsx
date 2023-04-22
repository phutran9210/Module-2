import React, { useEffect, useState } from "react";

import HeadNav from "./component/header/HeadNav";
import Carosel from "./component/carosel/Carosel";
import BodyContent1 from "./component/bodyContent-1";
import BodyContent2 from "./component/bodyContent-2";
const App = () => {
  // const [data, getData] = useState({});
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:3005/users")
  //     .then((response) => getData(response.data))
  //     .catch((err) => console.log(err));
  // }, []);
  // console.log(data);

  return (
    <div className="app">
      <HeadNav />
      <Carosel />
      <BodyContent1 />
      <BodyContent2 />
    </div>
  );
};

export default App;

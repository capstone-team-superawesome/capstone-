import React from "react";

import Navbar from "../features/navbar/Navbar";
import AppRoutes from "./AppRoutes";

const App = () => {
  return (
    <div>
      <img
        src="/img/pictbg.png"
        class="absolute w-full h-screen custom-bg-z-index bg-repeat-y"
      />
      <Navbar />
      <AppRoutes />
    </div>
  );
};

export default App;

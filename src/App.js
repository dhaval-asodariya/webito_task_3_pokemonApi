import React from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import FatchNDisplayCards from "./components/FatchNDisplayCards";
import PokoPage from "./components/PokoPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<FatchNDisplayCards />}></Route>
        <Route path='pokemon/:id' element={<PokoPage />}></Route>
      </Routes>
    </div>
  );
}
export default App;

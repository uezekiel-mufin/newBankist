import { useState } from "react";
import "./App.css";

import Home from "./Components/Home";
import { Routes, Route } from "react-router-dom";
import HowToUse from "./Components/HowToUse";

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/howto' element={<HowToUse />} />
      </Routes>
    </div>
  );
}

export default App;

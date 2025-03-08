import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./index.css";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import About from "./pages/About";
import Profile from "./pages/Profile";
import SignUP from "./pages/SignUp";
import Header from "./components/Header";


function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<SignUP />} />
        <Route path="/about" element={<About />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

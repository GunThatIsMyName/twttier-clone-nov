import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/home";
import Profile from "../routes/profile";
import Navitation from "./navigation";

const Router = ({ isLoggedIn }) => {
  return (
    <BrowserRouter>
      {isLoggedIn && <Navitation />}
      <Routes>
        <Route path="/" element={isLoggedIn ? <Home /> : <Auth />} />
        {isLoggedIn && <Route path="/profile" element={<Profile />} />}
        <Route path="/*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

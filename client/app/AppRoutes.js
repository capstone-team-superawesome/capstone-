import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Routes } from "react-router-dom";
import AuthForm from "../features/auth/AuthForm";
import Home from "../features/home/Home";
import { me } from "./store";
import Board from "../features/canvas/Board";
import About from "../features/about/About";
import Profile from "../features/profile/ProfilePage";
import EditProfile from "../features/editprofile/EditProfilePage";
import Info from "../features/about/Info";

/**
 * COMPONENT
 */

const AppRoutes = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(me());
  }, []);

  return (
    <div>
      <Routes>
        <Route to="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/info" element={<Info />} />
        {isLoggedIn ? (
          <>
            <Route path="/*" element={<Home />} />

            <Route path="/canvas" element={<Board />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/editprofile" element={<EditProfile />} />
          </>
        ) : (
          <>
            <Route
              path="/*"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/login"
              element={<AuthForm name="login" displayName="Login" />}
            />
            <Route
              path="/signup"
              element={<AuthForm name="signup" displayName="Sign Up" />}
            />
          </>
        )}
      </Routes>
    </div>
  );
};

export default AppRoutes;

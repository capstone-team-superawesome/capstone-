import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const profilePic = useSelector((state) => state.auth.me.profilePicture);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="navbar">
      <nav class="relative p-2 bg-blue-400">
        <div class="flex items-center justify-between">
          <div class="w-2/5">
            <Link to="/home">
              <img src="img/logo.svg " class="w-full" />
            </Link>
          </div>

          {/* <!-- Menu Items --> */}
          {isLoggedIn ? (
            <div class="flex space-x-6 w-3/5 justify-items-end">
              {/* The navbar will show these links after you log in */}
              <Link to="/profile">
                <img
                  style={{
                    height: "40px",
                    marginBottom: "-15px",
                    borderRadius: "100px",
                    border: "black solid 1px",
                  }}
                  src={profilePic}
                />
              </Link>
              <span>Welcome, {username}!</span>
              <button type="button" onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </div>
          ) : (
            <div class="flex space-x-6 w-3/5 justify-items-end" id="about">
              {/* The navbar will show these links before you log in */}
              <Link to="/home" class="hover:text-veryLightGray">
                Home
              </Link>
              <Link to="/about" class="hover:text-veryLightGray mr-1">
                About Us
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

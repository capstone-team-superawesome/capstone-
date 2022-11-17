import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const username = useSelector((state) => state.auth.me.username);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      {/* TODO: Incorporate link with logo */}
      {/* <Link to="/home">
        <h1 style={{ color: "black" }}>Pictionary</h1>
      </Link> */}
      <div className="navbar">
        <nav class="relative container mx-auto p-6 bg-blue-500">
          <div class="flex items-center justify-between">
            <div class="pt-2">
              <img src="img/logo.svg" alt="" />
            </div>
            {/* <!-- Menu Items --> */}
            <div class="flex space-x-6"></div>
          </div>
          {isLoggedIn ? (
            <span>
              {/* The navbar will show these links after you log in */}
              <Link to="/profile">
                <img
                  style={{
                    height: "40px",
                    marginBottom: "-15px",
                    borderRadius: "100px",
                    border: "black solid 1px",
                  }}
                  src="https://www.booksie.com/files/profiles/22/mr-anonymous_230x230.png"
                ></img>
              </Link>
              Welcome, {username}!<Link to="/home"></Link>
              <button type="button" onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </span>
          ) : (
            <div id="about">
              {/* The navbar will show these links before you log in */}
              <div class="grid justify-items-end hover:text-darkGrayishBlue">
                <Link to="/home">Home</Link>
                <Link to="/about">About Us</Link>
              </div>
            </div>
          )}
        </nav>
        <hr />
      </div>
    </div>
  );
};

export default Navbar;

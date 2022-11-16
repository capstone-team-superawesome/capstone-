import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../../app/store";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => !!state.auth.me.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutAndRedirectHome = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div>
      <Link to="/home">
        <h1 style={{ color: "black" }}>Pictionary</h1>
      </Link>
      <div className="navbar">
        <nav>
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
              <Link to="/home">Home</Link>
              <Link to="/canvas">Draw</Link>
              <button type="button" onClick={logoutAndRedirectHome}>
                Logout
              </button>
            </span>
          ) : (
            <div id="about">
              {/* The navbar will show these links before you log in */}
              <Link to="/home">Home</Link>
              <Link to="/about">About</Link>
            </div>
          )}
        </nav>
        <hr />
      </div>
    </div>
  );
};

export default Navbar;

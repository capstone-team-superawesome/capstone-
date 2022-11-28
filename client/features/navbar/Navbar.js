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
    navigate("/home");
  };

  return (
    <div className="navbar">
      <nav class="bg-gradient-to-r from-cyan-400 to-blue-500">
        <div class="flex items-center justify-between px-4 py-0">
          <div class="w-1/4">
            <Link to="/home">
              <img src="img/Pictionary-Logo.png " class="w-full" />
            </Link>
          </div>
          {/* <!-- Menu Items --> */}
          <div class="flex w-3/4 justify-end">
            <Link
              to="/info"
              class="hover:text-veryLightGray font-serif text-zinc-900 text-xl"
            >
              Info
            </Link>
            <Link
              to="/about"
              class="hover:text-veryLightGray font-serif text-zinc-900 text-xl"
            >
              About Us
            </Link>

            {isLoggedIn ? (
              <>
                {/* The navbar will show these links after you log in */}
                <Link
                  to="/profile"
                  class="hover:text-veryLightGray font-serif text-zinc-900 text-xl"
                >
                  Profile
                  {/* <img
                    style={{
                      height: "40px",
                      marginBottom: "-15px",
                      borderRadius: "100px",
                      border: "black solid 1px",
                    }}
                    src={profilePic}
                  /> */}
                </Link>
                <Link
                  type="button"
                  class="hover:text-veryLightGray font-serif text-zinc-900 text-xl"
                  onClick={logoutAndRedirectHome}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  class="hover:text-veryLightGray font-serif text-zinc-900 text-xl"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  class="hover:text-veryLightGray font-serif  text-zinc-900 text-xl"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;

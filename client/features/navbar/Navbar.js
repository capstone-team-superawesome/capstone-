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
          <div>
            {" "}
            <img src="img/pictstickfigures.png" class="w-full" />
          </div>

          {/* <!-- Menu Items --> */}
          <div class="flex w-3/4 justify-end">
            {isLoggedIn ? (
              <span>
                <Link to="/profile">
                  <section
                    style={{
                      width: "50px",
                      height: "50px",
                      overflow: "hidden",
                      borderRadius: "50%",
                      border: "black solid 2px",
                    }}
                  >
                    <img
                      style={{
                        display: "inline",
                        margin: "0 auto",
                        height: "100%",
                        width: " auto",
                      }}
                      src={profilePic}
                    />
                  </section>
                </Link>
              </span>
            ) : null}
            <Link
              to="/info"
              class="hover:text-veryLightGray font-serif text-zinc-900 text-2xl"
            >
              Info
            </Link>
            <Link
              to="/about"
              class="hover:text-veryLightGray font-serif text-zinc-900 text-2xl"
            >
              About Us
            </Link>

            {isLoggedIn ? (
              <>
                <Link
                  type="button"
                  class="hover:text-veryLightGray font-serif text-zinc-900 text-2xl"
                  onClick={logoutAndRedirectHome}
                >
                  Logout
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  class="hover:text-veryLightGray font-serif text-zinc-900 text-2xl"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  class="hover:text-veryLightGray font-serif  text-zinc-900 text-2xl"
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

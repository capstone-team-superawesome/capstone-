import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch]);

  const { id, username, profilePicture, bio, totalScore } = useSelector(
    (state) => state.auth.me
  );

  // const { } = useSelector((state) => {
  //   state.editProfilePage;
  // });

  return (
    <div>
      <div class="bg-gray-300 m-10 p-10 rounded-2xl">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: "15%",
          }}
        >
          <section style={{ display: "inline", position: "relative" }}>
            <img
              style={{
                width: "150px",
                borderRadius: "100px",
                border: "black solid 2px",
              }}
              src={profilePicture}
            ></img>
            <Link to="/editprofile">
              <img
                style={{
                  height: "25px",
                  position: "absolute",
                  bottom: "0",
                  right: "0",
                }}
                src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
              ></img>
            </Link>
          </section>
          <div>
            <section>
              <h1 style={{ marginLeft: "100px" }}>{username}</h1>
            </section>
            <div
              style={{
                display: "inline",
                position: "relative",
              }}
            >
              <textarea
                style={{
                  marginLeft: "100px",
                  width: "500px",
                }}
                rows="7"
                value={bio}
              ></textarea>
              <Link to="/editprofile">
                <img
                  style={{
                    height: "25px",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                  }}
                  src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
                ></img>
              </Link>
            </div>
          </div>
        </div>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2%",
          }}
        >
          <div>
            <h1 style={{ fontSize: "250%" }}>HighScore</h1>
            <h1>{totalScore}</h1>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;

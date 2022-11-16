import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../editprofile/EditProfilePageSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  });

  const { username, profilePicture, bio, id } = useSelector(
    (state) => state.auth.me
  );

  return (
    <div>
      <div>
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
                defaultValue={bio}
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
          <h1 style={{ fontSize: "250%" }}>Top Scores</h1>
        </section>
      </div>
    </div>
  );
};

export default Profile;

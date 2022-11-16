import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Profile = () => {
  const { username, profilePicture } = useSelector((state) => state.auth.me);

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
                height: "150px",
                width: "150px",
                borderRadius: "100px",
                border: "black solid 2px",
              }}
              src={profilePicture}
            ></img>
            <img
              style={{
                height: "25px",
                position: "absolute",
                bottom: "0",
                right: "1",
              }}
              src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            ></img>
          </section>
          <div>
            <section>
              <h1 style={{ marginLeft: "100px" }}>{username}</h1>
            </section>
            <section
              style={{
                marginLeft: "100px",
              }}
            >
              bio
            </section>
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

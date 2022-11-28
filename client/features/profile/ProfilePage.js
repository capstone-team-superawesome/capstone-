import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser } from "../auth/authSlice";

const Profile = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser(id));
  }, [dispatch]);

  const { id, username, profilePicture, bio, email, totalScore } = useSelector(
    (state) => state.auth.me
  );
  //Take first letter and make uppercase
  const upperCaseName = username.charAt(0).toUpperCase() + username.slice(1);
  // const { } = useSelector((state) => {
  //   state.editProfilePage;
  // });

  return (
    <div class="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 m-10 p-10 rounded-2xl flex justify-between h-96">
      <div class="flex-col justify-start w-1/3 mx-2">
        <div class="absolute">
          <section
            style={{
              width: "150px",
              height: "150px",
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
              src={profilePicture}
            />
          </section>
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
      <div class="flex-col justify-start w-1/3 mx-2">
        <h1 class="text-3xl mb-1">Welcome {upperCaseName}!</h1>
        <div>
          <div>Email: {email}</div>
          <div>Bio: {bio}</div>
        </div>
        <section
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2%",
          }}
        ></section>
      </div>
      <div class="flex-col justify-start w-1/3 mx-2 text-center">
        <div class="text-4xl">High Score: </div>
        <div> {totalScore}</div>
      </div>
      {/* Not sure what this is for */}
      {/* <section
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2%",
        }}
      >
        <h1 style={{ fontSize: "250%" }}>Top Scores</h1>
      </section> */}
    </div>
  );
};

export default Profile;

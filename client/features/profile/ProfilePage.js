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

  const upperCaseName = username.charAt(0).toUpperCase() + username.slice(1);

  //Level up and Ranking System. 10 level ups, each requires ~1.3x the experience of the last.
  let exp = 10000;
  let currentLvl = 0;
  const levels = {};

  for (let i = 1; i <= 10; i++) {
    levels[exp] = i;
    exp *= 2;
  }

  const levelsArray = Object.keys(levels);
  const lastLevel = levelsArray[levelsArray.length - 1];

  for (let i = 0; i < levelsArray.length; i++) {
    if (totalScore >= levelsArray[i] && totalScore < levelsArray[i + 1]) {
      currentLvl = levelsArray[i];
      break;
    }
  }

  totalScore > lastLevel ? (currentLvl = levels[lastLevel]) : null;
  //console.log(levels);
  //

  return (
    <div class="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 m-10 p-10 rounded-2xl flex justify-between custom-profile-page">
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
        <h1 class="text-4xl mb-1">Welcome {upperCaseName}!</h1>
        <div>
          <div class="text-2xl">Email: {email}</div>
          <div class="text-2xl">Bio: {bio}</div>
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
        <div class="text-4xl">Level {currentLvl} </div>
        <div>Level Up Bar</div>
        <div class="text-4xl"> {totalScore} exp</div>
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

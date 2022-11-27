import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUser } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const { username, email, profilePicture, password, id, bio } = useSelector(
    (state) => state.auth.me
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const upperCaseName = username.charAt(0).toUpperCase() + username.slice(1);

  const [updateBio, setUpdateBio] = useState(bio);
  const [updateEmail, setUpdateEmail] = useState(email);
  const [updatePassword, setUpdatePassword] = useState(password);
  const [profileImage, setProfileImage] = useState(profilePicture);

  const presetProfilePics = [
    "https://images.emojiterra.com/google/noto-emoji/v2.034/512px/270f.png",
    "https://mymodernmet.com/wp/wp-content/uploads/2018/05/still-life-painting-4.jpg",
    "https://www.artlicity.com/wp-content/uploads/magictoolbox_cache/feec0ce93ed582c279c1c0e924581ec5/1/1/11086/original/1760357197/0805191401OC-Bodeg%C3%B3n-de-aguacate-.jpg",
    "https://www.shutterstock.com/blog/wp-content/uploads/sites/5/2021/09/Still-Life-Cover.jpg",
    "https://www.booksie.com/files/profiles/22/mr-anonymous_230x230.png",
  ];

  const profilePictureDropdown = () => {
    const profilePictures = document.getElementById("profilePicturePresets");
    profilePictures.style.display == "none"
      ? (profilePictures.style.display = "block")
      : (profilePictures.style.display = "none");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const userObj = {
      id,
      updateEmail,
      updatePassword,
      profileImage,
      updateBio,
    };
    dispatch(editUser(userObj));
    navigate("/profile");
  };

  return (
    <div class="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 m-10 p-10 rounded-2xl flex justify-between h-96">
      <div class="flex-col justify-start w-1/3">
        <div class="absolute">
          <img
            style={{
              width: "150px",
              borderRadius: "100px",
              border: "black solid 2px",
            }}
            src={profilePicture}
          />
          <img
            id="profilePictureEditIcon"
            className="collapsible"
            style={{
              height: "25px",
              position: "absolute",
              bottom: "0",
              right: "0",
            }}
            src="https://cdn-icons-png.flaticon.com/512/1159/1159633.png"
            onClick={profilePictureDropdown}
          />
          <div
            id="profilePicturePresets"
            className="content"
            style={{ display: "none" }}
          >
            {presetProfilePics.map((picture, index) => (
              <img
                key={index}
                src={picture}
                style={{ height: "100px" }}
                onClick={(event) => setProfileImage(picture)}
              ></img>
            ))}
          </div>
        </div>
      </div>
      <div class="flex-col justify-start w-2/3">
        <h1 class="text-4xl">Editing profile for {upperCaseName}:</h1>
        <div>
          <textarea
            style={{
              width: "500px",
              borderRadius: "5px",
            }}
            rows="4"
            value={updateBio}
            onChange={(event) => setUpdateBio(event.target.value)}
          ></textarea>
          <div>
            <label class="font-serif" htmlFor="email">
              Email:{" "}
            </label>
            <input
              name="email"
              value={updateEmail}
              onChange={(e) => setUpdateEmail(e.target.value)}
              placeholder={updateEmail}
            />
            <label class="font-serif" htmlFor="password">
              Password:{" "}
            </label>
            <input
              type="password"
              name="password"
              onChange={(e) => setUpdatePassword(e.target.value)}
              placeholder="Enter new password"
            />
          </div>
          <button
            class="w-1/2 bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 py-2 px-4 rounded-full hover:shadow-lg hover:shadow-cyan-500"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

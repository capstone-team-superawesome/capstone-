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

  const [updateBio, setUpdateBio] = useState(bio);
  const [updateEmail, setUpdateEmail] = useState(email);
  const [updatePassword, setUpdatePassword] = useState(password);
  const [profileImage, setProfileImage] = useState(profilePicture);

  // o: wouldn't it make more sense to store these in the db?
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
            <div
              style={{
                width: "150px",
                height: "150px",
                overflow: "hidden",
                borderRadius: "100px",
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
                src={profileImage}
              ></img>
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
              ></img>
            </div>
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
          </section>
          <div>
            <section>
              <h1 style={{ marginLeft: "100px" }}>{username}</h1>
            </section>
            <textarea
              style={{
                marginLeft: "100px",
                width: "500px",
              }}
              rows="7"
              value={updateBio}
              onChange={(event) => setUpdateBio(event.target.value)}
            ></textarea>
            <div>
              <label htmlFor="email">Email: </label>
              <input
                name="email"
                value={updateEmail}
                onChange={(e) => setUpdateEmail(e.target.value)}
                placeholder={updateEmail}
              />
              <label htmlFor="password">Password: </label>
              <input
                type="password"
                name="password"
                onChange={(e) => setUpdatePassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
            <button onClick={handleSubmit}>Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;

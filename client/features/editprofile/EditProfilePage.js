import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const EditProfile = () => {
  const { username, email, profilePicture } = useSelector(
    (state) => state.auth.me
  );
  const [bio, setBio] = useState("example bio!");
  const [updateEmail, setUpdateEmail] = useState(email);
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

  const updateInfo = (event) => {};

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
                  // ¡HEY! when the backend is done, change the user.profilePicture on the backend.
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
              value={bio}
              onChange={(event) => setBio(event.target.value)}
              onClick={updateInfo}
            ></textarea>
            <div>
              <input
                style={{
                  marginLeft: "100px",
                  marginTop: "10px",
                  fontSize: "20px",
                }}
                value={updateEmail}
                onChange={(event) => setUpdateEmail(event.target.value)}
              ></input>
            </div>
          </div>
        </div>

        <section
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "2%",
          }}
        ></section>
      </div>
    </div>
  );
};

export default EditProfile;
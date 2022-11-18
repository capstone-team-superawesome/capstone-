import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authenticate } from "../../app/store";
import { Link } from "react-router-dom";

/**
  The AuthForm component can be used for Login or Sign Up.
  Props for Login: name="login", displayName="Login"
  Props for Sign up: name="signup", displayName="Sign Up"
**/

const AuthForm = ({ name, displayName }) => {
  const { error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const formName = evt.target.name;
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticate({ username, password, method: formName }));
  };

  return (
    <div style={{ width: "100%" }}>
      <div className="container-left" style={{ float: "left", width: "40%" }}>
        <h1 id="game-title">What is Pictionary?</h1>
        <p>
          Pictionary is a charades-inspired word-guessing game invented by
          Robert Angel with graphic design by Gary Everson and first published
          in 1985 by Angel Games Inc. Angel Games licensed Pictionary to Western
          Publishing. Hasbro purchased the rights in 1994 after acquiring the
          games business of Western Publishing. Mattel acquired ownership of
          Pictionary in 2001. The game is played in teams with players trying to
          identify specific words from their teammates.
        </p>
      </div>
      <div className="container-right" style={{ float: "right", width: "40%" }}>
        <h1 id="signup-form">{name}</h1>
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="username">
                <small className="input-name">Username</small>
              </label>
              <input
                class=" text-black py-2 px-4 rounded"
                name="username"
                type="text"
              />
            </div>
            <div>
              <label htmlFor="password">
                <small className="input-name">Password</small>
              </label>
              <input
                class=" text-black font-bold py-2 px-4 rounded"
                name="password"
                type="password"
              />
            </div>

            <div>
              <button
                class="bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 rounded"
                type="submit"
              >
                {displayName}
              </button>
            </div>
            {error && <div> {error} </div>}
          </form>
          {name === "login" ? (
            <p id="form-option">
              Not a member? <Link to="/signup">Sign up</Link>
            </p>
          ) : (
            <p id="form-option">
              Already a member? <Link to="/login">Log in</Link>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

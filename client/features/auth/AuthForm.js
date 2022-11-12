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
        <h1 id="game-title">Describe the game.</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
          luctus id ligula non pellentesque. Aenean ultrices posuere imperdiet.
          Mauris vestibulum, metus pretium vehicula tincidunt, magna dui
          imperdiet odio, ac vehicula lectus erat vitae quam. Mauris suscipit
          nisl non sagittis sollicitudin. Mauris in velit suscipit, sodales est
          id, ornare tellus. Nullam auctor ante ac sapien egestas faucibus.
          Donec euismod nec erat vitae ultricies.
        </p>
      </div>
      <div className="container-right" style={{ float: "right" }}>
        <h1 id="signup-form">{name}</h1>
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <div>
              <label htmlFor="username">
                <small className="input-name">Username</small>
              </label>
              <input name="username" type="text" />
            </div>
            <div>
              <label htmlFor="password">
                <small className="input-name">Password</small>
              </label>
              <input name="password" type="password" />
            </div>

            <div>
              <button type="submit">{displayName}</button>
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

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
  
      <div className="container-right" style={{ float: "right", width: "40%" }}>
        <div>
          <form onSubmit={handleSubmit} name={name}>
            <label class="block">
              <span class="block text-sm font-serif text-slate-700">
                Username
              </span>
              <div>
                <input
                  name="username"
                  type="text"
                  // if username is not valid email invalied will trigger color change
                  // type="email"
                  class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
              <div>
                <span class="block text-sm font-serif text-slate-700">
                  Password
                </span>
                <input
                  name="password"
                  type="password"
                  class="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
      invalid:border-pink-500 invalid:text-pink-600
      focus:invalid:border-pink-500 focus:invalid:ring-pink-500"
                />
              </div>
            </label>

            <div>
              <button
                class="bg-blue-400 hover:bg-blue-500 text-white font-serif py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                type="submit"
              >
                {displayName}
              </button>
            </div>
            {error && <div> {error} </div>}
          </form>
          {name === "login" ? (
            <p id="form-option">
              <span class="block text-sm font-serif text-slate-700">
                Not a member? <Link to="/signup">Sign up</Link>
              </span>
            </p>
          ) : (
            <p id="form-option">
              <span class="block text-sm font-seriftext-slate-700">
                {" "}
                Already a member? <Link to="/login">Log in</Link>
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

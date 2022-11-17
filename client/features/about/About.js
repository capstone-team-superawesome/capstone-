import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function About() {
  return (
    <div className="bg-red-800">
      <h1 id="about-us-title">About Us</h1>
      <div className="about-us-container">
        <div className="left-margin">
          <div>Emmanuel Cruz</div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="bg-cyan-400 text-xl m-10">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            {" "}
            <FaLinkedin /> <FaGithub />{" "}
          </div>
        </div>
        <div className="middle-margin">
          <div>John-David Noguera</div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            {" "}
            <FaLinkedin /> <FaGithub />{" "}
          </div>
        </div>
        <div className="middle-margin">
          <div>Alejandro Baez</div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            {" "}
            <FaLinkedin /> <FaGithub />{" "}
          </div>
        </div>
        <div className="right-margin">
          <div>Ethan Lee</div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            {" "}
            <FaLinkedin /> <FaGithub />{" "}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

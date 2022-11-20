import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function About() {
  return (
    <div class="bg-gray-300 m-10 p-10 flex-col items-center rounded-2xl">
      <h1 class="text-center">About Us</h1>
      <div class="text-center">Meet our skilled professionals</div>
      <div className="about-us-container">
        <div className="custom-single-about">
          <div>Emmanuel Cruz</div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            <FaLinkedin />
            <FaGithub />
          </div>
        </div>
        <div className="custom-single-about">
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
        <div className="custom-single-about">
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
        <div className="custom-single-about">
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

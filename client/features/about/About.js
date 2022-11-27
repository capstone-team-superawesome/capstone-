import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function About() {
  return (
    <div class="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 m-10 p-10 flex-col items-center rounded-2xl">
      <h1 class="text-center text-xl">About Us</h1>
      <div class="text-center text-2xl">Meet our skilled professionals</div>
      <div className="about-us-container" class="flex mt-24 space-x-4">
        <div className="custom-single-about" class="m-2">
          <div class="font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
            Emmanuel Cruz
          </div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph" class="font-serif">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            <FaLinkedin />
            <FaGithub />
          </div>
        </div>
        <div className="custom-single-about" class="m-2">
          <div class="font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
            John-David Noguera
          </div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph" class="font-serif">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            {" "}
            <FaLinkedin /> <FaGithub />{" "}
          </div>
        </div>
        <div className="custom-single-about" class="m-2">
          <div class="font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
            Alejandro Baez
          </div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph" class="font-serif">
            About you. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Pellentesque luctus id ligula non pellentesque.
          </p>
          <div>
            {" "}
            <FaLinkedin /> <FaGithub />{" "}
          </div>
        </div>
        <div className="custom-single-about" class="m-2">
          <div class="font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
            Ethan Lee
          </div>
          <img src="" />
          <span> [Profile pic goes here]</span>
          <p className="paragraph" class="font-serif">
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

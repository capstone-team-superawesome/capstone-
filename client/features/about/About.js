import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function About() {
  return (
    <div class="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 m-10 p-10 flex-col items-center rounded-2xl">
      <h1 class="text-center text-3xl">About Us</h1>
      <div class="text-center text-2xl">Meet our skilled professionals</div>
      <div className="about-us-container" class="flex mt-24 space-x-4">
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              Emmanuel Cruz
            </div>

            <span>
              <img src="img/spiderman.png" />{" "}
            </span>
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div>
              <FaLinkedin />
              <FaGithub />
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              John-David Noguera
            </div>
            <img src="" />
            <span>
              {" "}
              <img src="img/Johnpic.png"></img>
            </span>
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div>
              {" "}
              <FaLinkedin /> <FaGithub />{" "}
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class=" text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              Alejandro Baez
            </div>
            <img src="" />
            <span>
              {" "}
              <img src="img/AlejandroPic.png"></img>
            </span>
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div>
              {" "}
              <FaLinkedin /> <FaGithub />{" "}
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              Ethan Lee
            </div>
            <img src="" />
            <span>
              {" "}
              <img src="img/Ethanpic.png"></img>
            </span>
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div>
              {" "}
              <FaLinkedin /> <FaGithub />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

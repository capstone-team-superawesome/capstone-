import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";

function About() {
  return (
    <div class="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 m-10 p-10 flex-col items-center rounded-2xl">
      <div class="flex w-full mx-auto justify-between px-30">
        <img src="img/pictstickfigureyellow.png" />
        <img src="img/picstickfigureorange.png" />
        <div class="m-10">
          <h1 class="text-center text-3xl">About Us</h1>
          <div class="text-center text-2xl">Meet our skilled professionals</div>
        </div>
        <img src="img/pictstickfigureblue.png" />
        <img src="img/pictstickfiguregreen.png" />
      </div>
      <div className="about-us-container">
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              Emmanuel Cruz
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/spiderman.png"
            />
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <FaLinkedin class="mr-5" />
              <FaGithub />
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              John-David Noguera
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/Johnpic.png"
            />
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <FaLinkedin class="mr-5" />
              <FaGithub />
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class=" text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              Alejandro Baez
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/AlejandroPic.png"
            />
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <FaLinkedin class="mr-5" /> <FaGithub />
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-blue-400 underline-offset-4">
              Ethan Lee
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/Ethanpic.png"
            />
            <p className="paragraph" class="font-serif">
              About you. Lorem ipsum dolor sit amet, consectetur adipiscing
              elit. Pellentesque luctus id ligula non pellentesque.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              {" "}
              <FaLinkedin class="mr-5" /> <FaGithub />{" "}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;

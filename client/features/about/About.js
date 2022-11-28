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
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-amber-400 underline-offset-4">
              Emmanuel Cruz
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/Manny.png"
            />
            <p className="paragraph" class="font-serif">
              Cruz possesses similar spider-based abilities as Peter Parker; he
              has the proportionate strength, speed, stamina, durability, and
              reflexes of a spider. He can lift up to ten tons, leap several
              stories, move much faster than the average human, and is generally
              more resistant to injury or fatigue than normal people.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <FaLinkedin class="mr-5" />
              <FaGithub />
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-amber-400 underline-offset-4">
              John-David Noguera
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/Johnpic.png"
            />
            <p className="paragraph" class="font-serif">
              Formerly a customer service specialist at American Family
              Insurance and prior to said position I have held jobs in various
              different sectors ranging from healthcare to administrative
              assistance. Am highly passionate about melding soft skills
              acquired from past work experiences with my burgeoning knowledge
              of software engineering to create innovative, efficient, and
              digestible solutions to complex problems.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <a href="https://www.google.com" target="_blank">
                <FaLinkedin class="mr-5" />
              </a>
              <a href="https://www.google.com" target="_blank">
                <FaGithub />
              </a>
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class=" text-xl font-serif underline decoration-2 decoration-amber-400 underline-offset-4">
              Alejandro Baez
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/AlejandroPic.png"
            />
            <p className="paragraph" class="font-serif">
              I've always been fascinated by the seemingly never ending and ever
              growing capabilities of tech. This led me down a path of curiosity
              and knowledge, one that will probably never be satisfied. I enjoy
              all umbrellas of programming, and always teaching myself new
              technologies to further achieve my goals.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <FaLinkedin class="mr-5" /> <FaGithub />
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-xl font-serif underline decoration-2 decoration-amber-400 underline-offset-4">
              Ethan Lee
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/Ethan.png"
            />
            <p className="paragraph" class="font-serif">
              Hello, my name is Ethan. Before attending Fullstack Academy to
              learn software engineering, I was a part-time server, barista, and
              part-time soldier in the US Army. I served the Army Reserve for 6
              years, and I recently finished the contract in April, right before
              being accepted to Future Code program at Fullstack Academy.
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

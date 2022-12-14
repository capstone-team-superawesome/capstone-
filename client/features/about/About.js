import React from "react";
import { FaLinkedin, FaGithub } from "react-icons/fa";
function About() {
  return (
    <div class="bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 m-10 p-10 flex-col items-center rounded-2xl">
      <div class="flex w-full mx-auto justify-between px-30">
        <img src="img/pictstickfigureyellow.png" />
        <img src="img/picstickfigureorange.png" />
        <div class="m-10">
          <h1 class="text-center text-4xl font-caveat underline decoration-2 decoration-blue-400 underline-offset-4">
            About Us
          </h1>
          <div class="text-center text-2xl font-serif italic text-white">
            Meet our skilled professionals
          </div>
        </div>
        <img src="img/pictstickfigureblue.png" />
        <img src="img/pictstickfiguregreen.png" />
      </div>
      <div className="about-us-container">
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-4xl font-caveat underline decoration-2 decoration-amber-400 underline-offset-4">
              Emmanuel Cruz
            </div>
            <div class="mx-auto my-5 w-3/4 h-3/4 ">
              <img class=" object-cover" src="img/Manny.jpg" />
            </div>
            <p className="paragraph" class="font-serif">
                I have worked as a clerical service aide, and in a genetics lab
              researching Alzihemers. I am passionate about work that helps people
              or seeks to further our understanding of the world, and ideally
              both. I am excited to continue learning new skills and languages as
              I work towards that goal.
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <a
                href="https://www.linkedin.com/in/emmanuel-cruz-53297694/"
                target="_blank"
              >
                <FaLinkedin class="mr-5 hover:bg-amber-500" />
              </a>
              <a href="https://github.com/emmanuelcruz5" target="_blank">
                <FaGithub class="hover:bg-amber-500" />
              </a>
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class="text-4xl font-caveat  underline decoration-2 decoration-amber-400 underline-offset-4">
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
              <a
                href="https://www.linkedin.com/in/john-david-noguera/"
                target="_blank"
              >
                <FaLinkedin class="mr-5 hover:bg-amber-500" />
              </a>
              <a href="https://github.com/JNOGUE" target="_blank">
                <FaGithub class="hover:bg-amber-500" />
              </a>
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class=" text-4xl font-caveat underline decoration-2 decoration-amber-400 underline-offset-4">
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
              <a
                href="https://www.linkedin.com/in/baez-alejandro/"
                target="_blank"
              >
                <FaLinkedin class="mr-5 hover:bg-amber-500" />
              </a>
              <a href="https://github.com/alejandro-baez" target="_blank">
                <FaGithub class="hover:bg-amber-500" />
              </a>
            </div>
          </div>
        </div>
        <div class="w-96 mt-6 ml-4 p-3 shadow-2xl bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400 rounded">
          <div className="custom-single-about" class="m-2">
            <div class=" font-caveat text-4xl underline decoration-2 decoration-amber-400 underline-offset-4">
              Ethan Lee
            </div>
            <img
              class="mx-auto my-5 w-3/4 h-3/4 object-cover"
              src="img/Ethan.jpg"
            />
            <p className="paragraph" class="font-serif">
              Hello, my name is Ethan. Before attending Fullstack Academy to
              learn software engineering, I was a part-time server, barista, and
              part-time soldier in the US Army. I served the Army Reserve for 6
              years. With interest in Cybersecurity, I've obtained CompTIA A+
              and SEC+, and now I'm looking for an opportunity as a developer to
              build apps with security!
            </p>
            <div class="flex w-1/2  mx-auto justify-center mt-5">
              <a href="https://www.linkedin.com/in/ethanlee92/" target="_blank">
                <FaLinkedin class="mr-5 hover:bg-amber-500" />
              </a>
              <a href="https://github.com/dalpong2014" target="_blank">
                <FaGithub class="hover:bg-amber-500" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default About;

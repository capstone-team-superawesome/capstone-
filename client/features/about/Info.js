import React from "react";

const Info = () => {
  return (
    <div class=" p-10 flex-col">
      <div class="h-3/6 flex justify-between">
        <div class="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 mx-auto rounded-2xl w-2/3 p-10 mb-10">
          <p class="font-serif">
            <h1 class="text-4xl italic text-white" id="game-title">
              What is Pictionary?
            </h1>
          </p>

          <p class="font-serif text-black text-xl">
            Pictionary is a charades-inspired word-guessing game invented by
            Robert Angel with graphic design by Gary Everson and first published
            in 1985 by Angel Games Inc. Angel Games licensed Pictionary to
            Western Publishing. Hasbro purchased the rights in 1994 after
            acquiring the games business of Western Publishing. Mattel acquired
            ownership of Pictionary in 2001. The game is played in teams with
            players trying to identify specific words from their teammates.
          </p>
          <div>
            <img src="img/LoadingPageBoy.png"></img>
          </div>
        </div>
        <img class="w-1/3" src="./img/pictjoke1.png" />{" "}
      </div>
      <div class="flex h-3/6 justify-between">
        {" "}
        <img
          class="bg-slate-300 w-1/2 rounded-2xl mr-10"
          src="./img/pictionaryflow.png"
        />
        <div class="bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 mx-auto rounded-2xl w-1/2 p-10">
          <p class="font-serif">
            <h1 class="text-4xl italic text-white" id="game-title">
              How to ACTUALLY play Pictionary
            </h1>
          </p>

          <p class="font-serif text-black">-insert actual rules here-</p>
        </div>
      </div>
    </div>
  );
};

export default Info;

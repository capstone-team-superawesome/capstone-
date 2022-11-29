import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeGameCode, updateInputtedGameCode } from "../../app/store";
import { updateDrawerTrue, updateDrawerFalse } from "../../app/store";
import Landing from "./Landing";
import { makeSession, fetchAllPrompts } from "../../app/store";

const Home = (props) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.me.id);
  const gameCode = useSelector((state) => state.home.createdGameCode);
  const { prompts } = useSelector((state) => state.game);

  const promptList = useRef([]);
  const round = useRef(1);

  useEffect(() => {
    //console.log("INSIDE USE HOME EFFECT GC", makeGameCode);
    dispatch(makeGameCode(5));
    dispatch(updateInputtedGameCode(""));

    console.log("INSIDE HOME USE EFFECT PL ===>",promptList)
    if (!promptList.current[0]) {
      dispatch(fetchAllPrompts());
      const randomPrompts = shuffle(prompts);
    //console.log("INSIDE HOME USE EFFECT RANDOM Pr ===>",randomPromptList)

      promptList.current[0] = randomPrompts[0];
      promptList.current[1] = randomPrompts[1];
      promptList.current[2] = randomPrompts[2];
      promptList.current[3] = randomPrompts[3];
    }
  }, []);

  function shuffle(array) {
    let prompts = array.slice();
    let shuffledPrompts = [];

    while (prompts.length) {
      const index = Math.floor(Math.random() * prompts.length);
      shuffledPrompts.push(prompts[index].word);
      prompts.splice(index, 1);
    }
    return shuffledPrompts;
  }

  const navigate = useNavigate();
  const [inputGameCode, setInputGameCode] = useState("");

  const handleCreateGame = () => {
    console.log("GAMECODE before creating game ===>", gameCode);
    dispatch(
      makeSession({
        gameCode,
        isInSession: true,
        promptList: promptList.current,
        round: round.current,
      })
    );

    dispatch(updateDrawerTrue(id));
    navigate("/canvas");
  };

  const handleJoinGame = () => {
    dispatch(updateInputtedGameCode(inputGameCode));
    dispatch(updateDrawerFalse(id));
    navigate("/canvas");
  };

  return (
    <div>
      {id ? (
        <div id="initialScreen" class="my-5 mx-auto w-3/4">
          <div class="flex items-center justify-center gap-5">
            <button
              id="newGameButton"
              class="w-1/2 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 transition-colors duration-300 ease-in-out hover:text-white"
              onClick={() => handleCreateGame()}
            >
              Create a Room
            </button>
            <div class="text-center text-white font-serif text-xl">OR</div>

            <input
              type="text"
              placeholder="Enter Game Code"
              class="w-1/2 px-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
              value={inputGameCode}
              onChange={(event) => setInputGameCode(event.target.value)}
            />

            <button
              id="joinGameButton"
              class="w-1/2 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 transition-colors duration-300 ease-in-out hover:text-white"
              onClick={() => handleJoinGame()}
            >
              Join Game
            </button>
          </div>
        </div>
      ) : (
        <div class="flex justify-center my-5">
          <button
            class="w-1/2 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 transition-colors duration-300 ease-in-out hover:text-white "
            onClick={() => navigate("/login")}
          >
            Login to Play!
          </button>
        </div>
      )}
      <Landing />
    </div>
  );
};

export default Home;

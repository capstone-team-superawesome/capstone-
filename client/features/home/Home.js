import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeGameCode, updateInputtedGameCode } from "../../app/store";
import { updateDrawerTrue, updateDrawerFalse } from "../../app/store";
import { makeSession, fetchAllPrompts } from "../../app/store";

const Home = (props) => {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.me.id);
  const gameCode = useSelector((state) => state.home.createdGameCode);
  const { prompts } = useSelector((state) => state.game);

  const promptList = useRef([]);
  const round = useRef(1);

  useEffect(() => {
    !gameCode ? dispatch(makeGameCode(5)) : null;
    console.log("promptList.current[0]", promptList.current[0]);
    if (!promptList.current[0]) {
      dispatch(fetchAllPrompts());
      const randomPrompts = shuffle(prompts);
      console.log("RANDOM PROMPTS", randomPrompts);
      promptList.current[0] = randomPrompts[0];
      promptList.current[1] = randomPrompts[1];
      promptList.current[2] = randomPrompts[2];
      promptList.current[3] = randomPrompts[3];
      console.log("promptList.current AFTER", promptList.current);
    }
  });

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
    console.log("GAMECODE", gameCode);
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

  console.log("prompts", prompts);

  return (
    <div
      id="initialScreen"
      class="bg-gray-300 my-10 mx-auto p-10 flex-col rounded-2xl w-1/2"
    >
      <div class="flex-col items-center justify-center gap-5">
        <button
          id="newGameButton"
          class="w-full bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => handleCreateGame()}
        >
          Create a Room
        </button>
        <div class="text-center">OR</div>
        <div>
          <input
            type="text"
            placeholder="Enter Game Code"
            class="w-full px-3 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400
      focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500"
            value={inputGameCode}
            onChange={(event) => setInputGameCode(event.target.value)}
          />
        </div>
        <button
          id="joinGameButton"
          class="w-full bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded"
          onClick={() => handleJoinGame()}
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { makeGameCode, updateInputtedGameCode } from "../../app/store";
import { updateDrawerTrue, updateDrawerFalse } from "../../app/store";
import Landing from "./Landing";

const Home = (props) => {
  const dispatch = useDispatch();

  const id = useSelector((state) => state.auth.me.id);

  const navigate = useNavigate();
  const [inputGameCode, setInputGameCode] = useState("");

  const handleCreateGame = () => {
    dispatch(makeGameCode(5));
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
      <Landing />
      {id ? (
        <div id="initialScreen" class="mt-5 mx-auto w-3/4">
          <div class="flex items-center justify-center gap-5">
            <button
              id="newGameButton"
              class="w-full bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500"
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
              onChange={(e) => setInputGameCode(e.target.value)}
            />

            <button
              id="joinGameButton"
              class="w-1/2 bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500"
              onClick={() => handleJoinGame()}
            >
              Join Game
            </button>
          </div>
        </div>
      ) : (
        <div class="flex justify-center mt-5">
          <button
            class="w-1/2 bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500"
            onClick={() => navigate("/login")}
          >
            Login to Play!
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { makeGameCode, updateInputtedGameCode } from "../../app/store";
import { updateDrawerTrue, updateDrawerFalse } from "../../app/store";
/**
 * COMPONENT
 */
const Home = (props) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);
  const id = useSelector((state) => state.auth.me.id);
  const gameCode = useSelector((state) => state.home.createdGameCode);
  const isDrawer = useSelector((state) => state.auth.me.isDrawer);

  const navigate = useNavigate();
  const [inputGameCode, setInputGameCode] = useState("");
  const [users, setUsers] = useState([]);

  const handleCreateGame = () => {
    dispatch(makeGameCode(5));
    dispatch(updateDrawerTrue(id));
    navigate("/canvas");
  };

  const handleJoinGame = () => {
    dispatch(updateInputtedGameCode(inputGameCode));
    dispatch(updateDrawerFalse(id));
    //clientSocket.emit("joinRoom", inputGameCode); //need to verify if inputGameCode exists
    navigate("/canvas");
  };

  // clientSocket.on("refuse_connection", () => {
  //   console.log("HELLOOOOOOOOOO")
  //   navigate("/home");
  // });

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
            onChange={(e) => setInputGameCode(e.target.value)}
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

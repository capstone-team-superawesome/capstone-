import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { makeGameCode, updateInputtedGameCode } from "../../app/store";
const clientSocket = io(window.location.origin);
/**
 * COMPONENT
 */
const Home = (props) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);

  const gameCode = useSelector((state) => state.home.createdGameCode);

  const navigate = useNavigate();
  const [inputGameCode, setInputGameCode] = useState("");
  const [users, setUsers] = useState([]);

  const handleCreateGame = () => {
    dispatch(makeGameCode(5));
    navigate("/canvas");
  };

  const handleJoinGame = () => {
    dispatch(updateInputtedGameCode(inputGameCode));

    //clientSocket.emit("joinRoom", inputGameCode); //need to verify if inputGameCode exists
    navigate("/canvas");
  };

  return (
    <div id="initialScreen">
      <div>
        <button id="newGameButton" onClick={() => handleCreateGame()}>
          {" "}
          Create a Room{" "}
        </button>
        <div>OR</div>
        <div>
          <input
            type="text"
            placeholder="Enter Game Code"
            value={inputGameCode}
            onChange={(e) => setInputGameCode(e.target.value)}
          />
        </div>
        <button id="joinGameButton" onClick={() => handleJoinGame()}>
          Join Game
        </button>
      </div>
    </div>
  );
};

export default Home;

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import { useNavigate } from "react-router-dom";
import { makeGameCode } from "../../app/store";

/**
 * COMPONENT
 */
const Home = (props) => {
  const dispatch = useDispatch();

  const username = useSelector((state) => state.auth.me.username);

  const gameCode = useSelector((state) => state.home);

  const navigate = useNavigate();
  // const [gameCode, setGameCode] = useState("");
  const [users, setUsers] = useState([]);

  const handleCreateGame = () => {
    dispatch(makeGameCode(5));
    navigate("/canvas");
  };

  const handleJoinGame = (event) => {};

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
            value={gameCode}
            onChange={(e) => setGameCode(e.target.value)}
          />
        </div>
        <button
          type="submit"
          id="joinGameButton"
          onClick={() => handleJoinGame()}
        >
          Join Game
        </button>
      </div>
    </div>
  );
};

export default Home;

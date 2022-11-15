import React, { useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

/**
 * COMPONENT
 */
const Home = (props) => {
  const username = useSelector((state) => state.auth.me.username);

  const [gameCode, setGameCode] = useState("");
  const [users, setUsers] = useState([]);

  const handleCreateGame = (event) => {};

  const handleJoinGame = (event) => {};

  return (
    <div id="initialScreen">
      <div>
        <button
          type="submit"
          id="newGameButton"
          onClick={() => handleCreateGame()}
        >
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

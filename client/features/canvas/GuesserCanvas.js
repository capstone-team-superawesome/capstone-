import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addScore } from "../auth/authSlice";
import { fetchPromptList } from "../game/gameSlice";
import { useNavigate } from "react-router-dom";

const GuesserCanvas = ({ canvasRef, colorsRef, socketRef }) => {
  const [guess, setGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);
  const [counter, setCounter] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { gameSession } = useSelector((state) => state.game);
  const { inputtedGameCode } = useSelector((state) => state.home);
  const { id, totalScore } = useSelector((state) => state.auth.me);

  useEffect(() => {
    dispatch(fetchPromptList({ createdGameCode: inputtedGameCode }));
    const canvas = canvasRef.current;
    canvas.width = "1000";
    canvas.height = "500";
  }, []);

  const handleSubmit = () => {
    const promptList = gameSession.promptList;
    const round = gameSession.round;

    if (pastGuesses.length < 10) {
      pastGuesses.push(guess);
    } else {
      pastGuesses.shift();
      pastGuesses.push(guess);
    }
    setCounter(counter + 1);
    setCounter(counter - 1);
    console.log(pastGuesses);

    if (guess.toLowerCase() === promptList[round].toLowerCase()) {
      console.log("you got it!");
      const score = totalScore + 1000;
      dispatch(addScore({ id: id, score: score }));
      socketRef.current.emit("guessMade", true);
      navigate("/scorePage");
    }
  };

  return (
    <div>
      <div>
        <div>
          Your game session code is {inputtedGameCode ? inputtedGameCode : null}
        </div>
      </div>
      <div style={{ display: "inline-block" }}>
        <span ref={colorsRef} className="colors">
          <div className="color black" />
          <div className="color crimson" />
          <div className="color green" />
          <div className="color blue" />
          <div className="color yellow" />
          <div className="color white" />
        </span>
      </div>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "32px",
        }}
      >
        You are guessing
      </div>
      <div
        className="canvas-wrapper"
        style={{ cursor: "not-allowed", pointerEvents: "none" }}
      >
        <canvas
          id="container-canvas"
          ref={canvasRef}
          style={{
            backgroundColor: "white",
            border: "2px solid black",
            paddingLeft: "0",
            paddingRight: "0",
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
            backgroundColor: "white",
          }}
        />
      </div>
      <input
        type="text"
        placeholder="make a guess"
        onChange={(event) => setGuess(event.target.value)}
      ></input>
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
      <div>
        {pastGuesses.length
          ? pastGuesses.map((guess, index) => <div key={index}>{guess}</div>)
          : null}
      </div>
    </div>
  );
};

export default GuesserCanvas;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { fetchPromptList } from "../game/gameSlice";

const GuesserCanvas = ({ canvasRef, colorsRef }) => {
  const [guess, setGuess] = useState("");
  const dispatch = useDispatch();

  const { gameSession } = useSelector((state) => state.game);
  const { inputtedGameCode } = useSelector((state) => state.home);
  console.log(inputtedGameCode);

  useEffect(() => {
    dispatch(fetchPromptList({ createdGameCode: inputtedGameCode }));
    const canvas = canvasRef.current;
    canvas.width = "1000";
    canvas.height = "500";
  }, []);

  const handleSubmit = () => {
    const promptList = gameSession.promptList;
    const round = gameSession.round;
    if (guess.toLowerCase() === promptList[round].toLowerCase()) {
      console.log("you got it!");
    }
  };

  gameSession ? console.log(gameSession) : null;

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
    </div>
  );
};

export default GuesserCanvas;

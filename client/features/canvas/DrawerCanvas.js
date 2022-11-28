import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPromptList } from "../game/gameSlice";
import { addScore } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const DrawerCanvas = ({ colorsRef, canvasRef, socketRef }) => {
  const { id, totalScore } = useSelector((state) => state.auth.me);

  socketRef.current
    ? socketRef.current.on("guessReceived", (data) => {
        if (data) {
          const score = totalScore + 1000;
          dispatch(addScore({ id: id, score: score }));
          navigate("/scorePage");
        }
      })
    : null;

  const promptList = useRef([]);
  const currentRound = useRef(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createdGameCode } = useSelector((state) => state.home);
  const { gameSession } = useSelector((state) => state.game);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = "1000";
    canvas.height = "500";
  }, []);

  if (gameSession && gameSession[0]) {
    promptList.current = gameSession[0].promptList;
    currentRound.current = gameSession[0].round;
  }

  return (
    <div className="canvas-wrapper">
      <div class="my-10">
        <div class="text-center align-middle text-xl mt-5">
          Your game session code is {createdGameCode ? createdGameCode : null}
        </div>
      </div>

      <div class="flex justify-center w-1/2 mx-auto">
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
        You are Drawing:{" "}
        {gameSession && gameSession[0]
          ? promptList.current[currentRound.current]
          : null}
      </div>

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
  );
};

export default DrawerCanvas;

import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPromptList } from "../game/gameSlice";
import { addScore, updateDrawerFalse } from "../auth/authSlice";
import { useNavigate } from "react-router-dom";

const DrawerCanvas = ({ colorsRef, canvasRef, socketRef }) => {
  const { id } = useSelector((state) => state.auth.me);
  const promptList = useRef([]);
  const currentRound = useRef(1);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { createdGameCode } = useSelector((state) => state.home);
  const { gameSession } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(
      fetchPromptList({
        createdGameCode: createdGameCode || gameSession.gameCode,
      })
    );
    const canvas = canvasRef.current;
    canvas.width = "1000";
    canvas.height = "500";
  }, []);

  socketRef.current
    ? socketRef.current.on("guessReceived", (data) => {
        if (data) {
          dispatch(addScore({ id: id, score: 1000 }));
          if (gameSession.round >= 4) {
            navigate("/scorePage");
          } else {
            dispatch(updateDrawerFalse(id));
          }
        }
      })
    : null;

  if (gameSession) {
    promptList.current = gameSession.promptList;
    currentRound.current = gameSession.round;
  }

  return (
    <div className="canvas-wrapper">
      <div>
        <div>
          Your game session code is{" "}
          {gameSession.gameCode ? gameSession.gameCode : null}
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
        You are Drawing:{" "}
        {gameSession.id ? promptList.current[currentRound.current] : null}
      </div>

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
  );
};

export default DrawerCanvas;

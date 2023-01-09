import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPromptList, updateGameSession } from "../game/gameSlice";
import { makeGameCode, updateInputtedGameCode } from "../home/HomeSlice";

import io from "socket.io-client";
import { addScore } from "../auth/authSlice";

const Board = () => {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();
  const brushSizeRef = useRef(null);
  const brushSizes = [5, 10, 32, 64];

  // const brushHandler = (size) => {
  //   brushSize.current = size;
  // };

  const { gameSession } = useSelector((state) => state.game);

  const promptList = useRef([]);
  const currentRound = useRef(1);
  const [counter, setCounter] = useState(0);

  if (gameSession && gameSession[0]) {
    promptList.current = gameSession[0].promptList || gameSession.round;
    currentRound.current = gameSession[0].round || gameSession.round;
  }

  const [guess, setGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState(["", "", "", "", ""]);

  const [notification, setNotification] = useState(
    "Waiting for player to join..."
  );

  const gameCode = useSelector((state) => state.home.createdGameCode);
  const inputtedGameCode = useSelector((state) => state.home.inputtedGameCode);
  //const { promptList } = useSelector((state) => state.game.promptList);
  const isDrawer = useSelector((state) => state.auth.me.isDrawer);
  const { id, totalScore } = useSelector((state) => state.auth.me);

  const navigate = useNavigate();

  //Timer
  const [seconds, setSeconds] = useState(60);

  const beginGame = () => {
    socketRef.current.emit("beginTimer", { gameCode });
  };

  //when time is 0
  const resetTimer = () => {
    setSeconds(60);
  };

  const handleSubmit = () => {
    const promptList = gameSession.promptList;
    const round = gameSession.round;

    if (pastGuesses.length < 5) {
      pastGuesses.push(guess);
    } else {
      pastGuesses.shift();
      pastGuesses.push(guess);
    }
    setCounter(counter + 1);
    setCounter(counter - 1);
    console.log(pastGuesses);

    if (guess.trim().toLowerCase() === promptList[round].trim().toLowerCase()) {
      console.log("you got it!");
      const score = totalScore + 1000;
      dispatch(addScore({ id: id, score: score }));
      socketRef.current.emit("guessMade", true);
      navigate("/scorePage");
    }
  };

  useEffect(() => {
    if (gameCode) {
      dispatch(fetchPromptList({ createdGameCode: gameCode }));
    }
    if (inputtedGameCode) {
      dispatch(fetchPromptList({ createdGameCode: inputtedGameCode }));
    }
    window.scrollTo({ top: 200, left: 0, behavior: "smooth" });

    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // canvas.width = 1000;
    // canvas.height = 500;

    console.log("CANVAS BOARD ", canvas);

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");
    const brushSize5 = document.getElementsByClassName("5")[0];
    const brushSize10 = document.getElementsByClassName("10")[0];
    const brushSize32 = document.getElementsByClassName("32")[0];
    const brushSize64 = document.getElementsByClassName("64")[0];

    // set the current color
    const current = {
      color: "black",
      brushSize: 5,
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(" ")[1];
      console.log("COLOR TARGET. EVNET", current.color);
    };

    const onBrushUpdate = (e) => {
      current.brushSize = Number(e.target.className);
      console.log("BRUSH TARGET. EVNET", current.brushSize);
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    if (brushSize5) {
      brushSize5.addEventListener("click", onBrushUpdate, false);
      brushSize10.addEventListener("click", onBrushUpdate, false);
      brushSize32.addEventListener("click", onBrushUpdate, false);
      brushSize64.addEventListener("click", onBrushUpdate, false);
    }

    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, brushSize, emit) => {
      console.log("drawing a line, and brush size", color, brushSize);
      console.log("HELLLLO");
      // console.log(document.getElementsByClassName("color"));
      // console.log(document.getElementsByClassName("5"));
      // console.log(document.getElementsByClassName("5")[0]);
      // console.log(document.getElementsByClassName("5")[0].className);
      // let brushSize = brushSize || brushSize.current;
      const drawingContainer = document.getElementById("container-canvas");

      const canvasOffset = {
        x: drawingContainer.offsetLeft - scrollX,
        y: drawingContainer.offsetTop - scrollY,
      };

      // context.beginPath();

      // context.moveTo(x0 - canvasOffset.x, y0 - canvasOffset.y);
      // context.lineTo(x1 - canvasOffset.x, y1 - canvasOffset.y);
      // context.strokeStyle = color;
      // context.fillStyle = color;
      // context.lineWidth = brushSize.current;
      // context.fill();
      // context.stroke();
      // context.closePath();
      context.beginPath();
      if (brushSize <= 10) {
        context.moveTo(x0 - canvasOffset.x, y0 - canvasOffset.y);
        context.lineTo(x1 - canvasOffset.x, y1 - canvasOffset.y);
        context.strokeStyle = color;
        context.lineWidth = brushSize;
      } else {
        context.arc(
          x0 - canvasOffset.x,
          y0 - canvasOffset.y,
          brushSize,
          0,
          2 * Math.PI,
          false
        );
        context.fillStyle = color;
        context.strokeStyle = color;
      }
      context.fill();
      context.stroke();
      context.closePath();

      if (!emit) {
        return;
      }
      const w = canvas.width;
      const h = canvas.height;

      const roomName = gameCode ? gameCode : inputtedGameCode;

      // console.log("brushSize", brushSize);
      // console.log("brushSize.current", brushSize.current);

      socketRef.current.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
        brushSize,
        roomName,
      });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (e) => {
      drawing = true;
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseMove = (e) => {
      if (!drawing) {
        return;
      }

      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        current.brushSize,
        true
      );
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        current.brushSize,
        true
      );
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, arguments);
        }
      };
    };

    // -----------------add event listeners to our canvas ----------------------

    canvas.addEventListener("mousedown", onMouseDown, false);
    canvas.addEventListener("mouseup", onMouseUp, false);
    canvas.addEventListener("mouseout", onMouseUp, false);
    canvas.addEventListener("mousemove", throttle(onMouseMove, 0.001), false);

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 1), false);

    // -------------- make the canvas fill its parent component -----------------

    // const onResize = () => {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    // };

    // window.addEventListener("resize", onResize, false);
    // onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      isDrawer
        ? console.log("INSIDE ON DRAWING EVENT drawer side", data)
        : console.log("INSIDE ON DRAWING EVENT guesser side", data);

      drawLine(
        data.x0 * w,
        data.y0 * h,
        data.x1 * w,
        data.y1 * h,
        data.color,
        data.brushSize
      );
    };

    socketRef.current = io.connect("/");

    if (inputtedGameCode) {
      socketRef.current.emit("joinRoom", inputtedGameCode);
    } else {
      socketRef.current.emit("joinRoom", gameCode);
    }

    socketRef.current.on("drawing", onDrawingEvent);

    //timer
    socketRef.current.on("timer", (count) => {
      setSeconds(count);
    });

    socketRef.current.on("guessReceived", (data) => {
      if (data) {
        const score = totalScore + 1000;
        dispatch(addScore({ id: id, score: score }));
        navigate("/scorePage");
      }
    });

    //listen for new user event which sends room information
    socketRef.current.on("new user", (rooms) => {
      console.log("Front end rooms", rooms);
    });

    socketRef.current.on("room_full", (data) => {
      if (data) {
        console.log("INSIDE ROOM_FULL FRONT END");
        setNotification("Player has joined, start drawing!");
      }
    });

    function newGameCode() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      window.localStorage.setItem("gameCode", result);
      return result;
    }

    socketRef.current.on("refuse_connection", () => {
      dispatch(updateInputtedGameCode(newGameCode()));
      navigate("/home");

      alert("Gameroom is full, try a different code");
    });

    socketRef.current.on("disconnect", (msg) => {
      //dispatch(updateInputtedGameCode(""));
      // dispatch(makeGameCode(5));
      console.log(msg);
    });
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div className="bg-gray-300 m-10 p-10 rounded-2xl">
      <div class="flex flex-col justify-center align-center my-5">
        <div class="text-center align-middle text-xl mb-15">
          <b>TIME TO DRAW: </b>
          {seconds} seconds
        </div>

        {isDrawer ? (
          <button
            class="w-1/4 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 mx-auto self-center text-xl transition-colors duration-300 ease-in-out hover:text-white"
            onClick={beginGame}
          >
            Begin!
          </button>
        ) : (
          <button
            disabled="disabled"
            class="w-1/4 bg-blue-400  text-black font-serif py-2  border-b-4 border-blue-700  rounded   mx-auto self-center text-xl transition-colors duration-300 ease-in-out"
            onClick={beginGame}
          >
            Guess!
          </button>
        )}
      </div>

      {/* <div class="my-10">
      <div class="text-center align-middle text-xl mt-5">
        Your game session code is {gameCode ? gameCode : inputtedGameCode}
      </div>
    </div> */}

      {isDrawer ? (
        <div>
          <div style={{ display: "flex" }}>
            <h3
              style={{ flex: "1", display: "inline" }}
              class="text-center align-middle text-xl mt-5 m-2"
            >
              Your game session code is: {gameCode ? gameCode : null}
            </h3>
            <h3
              style={{ flex: "1", display: "inline" }}
              class="text-center align-middle text-xl mt-5 m-2"
            >
              {notification}
            </h3>
            <h3
              style={{ flex: "1", display: "inline" }}
              class="text-center align-middle text-xl mt-5 m-2"
            ></h3>
          </div>
          <div>
            <div style={{ display: "flex" }}>
              <span
                style={{ flex: "1", display: "inline-block" }}
                class="text-center align-middle text-xl mt-5 m-2"
              >
                <span ref={colorsRef} className="colors">
                  <div className="color black" />
                  <div className="color crimson" />
                  <div className="color green" />
                  <div className="color blue" />
                  <div className="color yellow" />
                  <div className="color white" />
                </span>
              </span>
              <span
                style={{
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "32px",
                  flex: "1",
                  display: "inline",
                }}
                class="text-center align-middle text-xl mt-5 m-2"
              >
                You are Drawing:{" "}
                {gameSession ? promptList.current[currentRound.current] : null}
              </span>
              <span
                style={{ flex: "1", display: "inline", marginLeft: "40px" }}
                class="text-center align-middle text-xl mt-5 m-2"
              >
                {brushSizes.map((size) => (
                  <span
                    className={size}
                    key={size}
                    //onClick={() => brushHandler(size)}
                    style={{
                      height: `${size}px`,
                      width: `${size}px`,
                      backgroundColor: "#949494",
                      borderRadius: "50%",
                      display: "inline-block",
                      marginRight: "15px",
                    }}
                  ></span>
                ))}
              </span>
            </div>
          </div>
          <canvas
            id="container-canvas"
            ref={canvasRef}
            width="1000"
            height="500"
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
      ) : (
        <div>
          <div class="my-10" style={{ display: "flex" }}>
            <div
              class="text-center align-middle text-xl mt-5 m-2"
              style={{ flex: "1" }}
            >
              Your game session code is{" "}
              {inputtedGameCode ? inputtedGameCode : null}
            </div>
            <h3
              class="text-center align-middle text-xl mt-5 m-2"
              style={{ flex: "1" }}
            >
              You have joined the session
            </h3>
            <div style={{ flex: "1" }}></div>
          </div>
          <div className="guesserBar">
            <span
              className="guesserBarColumn"
              style={{
                float: "left",
                width: "33%",
              }}
            >
              <span ref={colorsRef} className="colors">
                <div className="color black" />
                <div className="color crimson" />
                <div className="color green" />
                <div className="color blue" />
                <div className="color yellow" />
                <div className="color white" />
              </span>
            </span>
            <span
              className="guesserBarColumn"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "32px",
                float: "left",
                width: "33%",
              }}
            >
              You are guessing
            </span>
            <span
              className="guesserBarColumn"
              style={{
                float: "left",
                width: "33%",
                //marginRight: "10%",
              }}
            >
              <div
                style={{
                  float: "right",
                  width: "100%",
                }}
              >
                <input
                  type="text"
                  placeholder="make a guess"
                  onChange={(event) => setGuess(event.target.value)}
                  style={{ width: "auto", marginLeft: "5%" }}
                ></input>

                <button
                  //type="submit"
                  class="w-1/3 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 mx-auto self-center text-xl transition-colors duration-300 ease-in-out hover:text-white"
                  onClick={handleSubmit}
                  style={{ marginLeft: "20px" }}
                >
                  Submit
                </button>
                <div
                  style={{
                    position: "relative",
                    zIndex: "1000",
                    //float: "right",
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      height: "100px",
                      overflow: "scroll",
                      opacity: "50%",
                      marginTop: "16px",
                      width: "50%",
                      border: "1px solid black",
                    }}
                  >
                    {pastGuesses.length
                      ? pastGuesses.map((guess, index) => (
                          <div key={index}>{guess}</div>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              {/* <div
                style={{ position: "relative", zIndex: "1000", float: "right" }}
              >
                <div
                  style={{
                    position: "absolute",
                    height: "40px",
                    overflow: "scroll",
                    opacity: "50%",
                    marginTop: "20px",
                    width: "200px",
                  }}
                >
                  {pastGuesses.length
                    ? pastGuesses.map((guess, index) => (
                        <div key={index}>{guess}</div>
                      ))
                    : null}
                </div>
              </div> */}
            </span>
          </div>
          <div
            className="canvas-wrapper"
            style={{ cursor: "not-allowed", pointerEvents: "none" }}
          >
            <canvas
              id="container-canvas"
              ref={canvasRef}
              width="1000"
              height="500"
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
        </div>
      )}
    </div>
  );
};

export default Board;

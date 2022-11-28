import { useDispatch, useSelector } from "react-redux";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
import DrawerCanvas from "./DrawerCanvas";
import GuesserCanvas from "./GuesserCanvas";
import { updateGameSession } from "../game/gameSlice";

const Board = () => {
  const dispatch = useDispatch();
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  const gameCode = useSelector((state) => state.home.createdGameCode);
  const inputtedGameCode = useSelector((state) => state.home.inputtedGameCode);
  //const { promptList } = useSelector((state) => state.game.promptList);
  const isDrawer = useSelector((state) => state.auth.me.isDrawer);
  const { id } = useSelector((state) => state.auth.me);

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

  //called when time reaches 0 OR guess is correct
  const endOfRound = () => {
    dispatch(updateGameSession(true));
  };

  //called when (round is 3 AND time is 0), OR (round is 3 AND guess is correct) //set InSession to false
  const endOfGame = () => {};

  useEffect(() => {
    //prompts

    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");

    // set the current color
    const current = {
      color: "black",
    };

    // helper that will update the current color
    const onColorUpdate = (event) => {
      current.color = event.target.className.split(" ")[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }

    //we started using useState, but app started breaking, so we kept as is
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      const drawingContainer = document.getElementById("container-canvas");
      const canvasOffset = {
        x: drawingContainer.offsetLeft - scrollX,
        y: drawingContainer.offsetTop - scrollY,
      };
      context.beginPath();

      context.moveTo(x0 - canvasOffset.x, y0 - canvasOffset.y);
      context.lineTo(x1 - canvasOffset.x, y1 - canvasOffset.y);
      context.strokeStyle = color;
      context.lineWidth = 5;

      context.fillStyle = color;
      context.strokeStyle = color;

      context.fill();
      context.stroke();
      context.closePath();

      //when we took this line out, drawing started flickering in canvas
      if (!emit) {
        return;
      }

      const roomName = gameCode ? gameCode : inputtedGameCode;

      const { width, height } = canvas;
      socketRef.current.emit("drawing", {
        x0: x0 / width,
        y0: y0 / height,
        x1: x1 / width,
        y1: y1 / height,
        color,
        roomName,
      });
    };

    // ---------------- mouse movement --------------------------------------

    const onMouseDown = (event) => {
      drawing = true;
      current.x = event.clientX || event.touches[0].clientX;
      current.y = event.clientY || event.touches[0].clientY;
    };

    const onMouseMove = (event) => {
      if (!drawing) {
        return;
      }
      drawLine(
        current.x,
        current.y,
        event.clientX || event.touches[0].clientX,
        event.clientY || event.touches[0].clientY,
        current.color,
        true
      );
      current.x = event.clientX || event.touches[0].clientX;
      current.y = event.clientY || event.touches[0].clientY;
    };

    const onMouseUp = (event) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        event.clientX || event.touches[0].clientX,
        event.clientY || event.touches[0].clientY,
        current.color,
        true
      );
    };

    // ----------- limit the number of events per second -----------------------

    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      return function (...args) {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          callback.apply(null, args);
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

    canvas.width = "1000";
    canvas.height = "500";

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const { width, height } = canvas;
      drawLine(
        data.x0 * width,
        data.y0 * height,
        data.x1 * width,
        data.y1 * height,
        data.color
      );
    };

    socketRef.current = io.connect("/");

    if (inputtedGameCode) {
      socketRef.current.emit("joinRoom", inputtedGameCode);
      socketRef.current.on("drawing", onDrawingEvent);
    } else {
      socketRef.current.emit("joinRoom", gameCode);
      socketRef.current.on("drawing", onDrawingEvent);
    }

    //timer
    socketRef.current.on("timer", (count) => {
      setSeconds(count);
    });

    //listen for new user event which sends room information
    socketRef.current.on("new user", ({ users, host }) => {
      console.log("users : ", users, "host : ", host);
    });

    socketRef.current.on("refuse_connection", () => {
      navigate("/home");
      alert("Gameroom is full, try a different code");
    });

    socketRef.current.on("disconnect", (msg) => {
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
        <button
          class="w-1/4 bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 mx-auto self-center text-xl"
          onClick={beginGame}
        >
          Begin!
        </button>
      </div>

      {/* <div class="my-10">
        <div class="text-center align-middle text-xl mt-5">
          Your game session code is {gameCode ? gameCode : inputtedGameCode}
        </div>
      </div> */}

      {isDrawer ? (
        <DrawerCanvas
          colorsRef={colorsRef}
          canvasRef={canvasRef}
          socketRef={socketRef}
        />
      ) : (
        <GuesserCanvas
          canvasRef={canvasRef}
          colorsRef={colorsRef}
          socketRef={socketRef}
        />
      )}
    </div>
  );
};

export default Board;

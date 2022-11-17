import { useSelector } from "react-redux";

import React, { useRef, useEffect, useState } from "react";

import io from "socket.io-client";

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  const username = useSelector((state) => state.auth.me.username);
  const gameCode = useSelector((state) => state.home.createdGameCode);
  const inputtedGameCode = useSelector((state) => state.home.inputtedGameCode);

  //Timer
  const [seconds, setSeconds] = useState(60);
  const [startButton, setStartButton] = useState(false);

  const startTimer = () => {
    setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };

  const resetTimer = () => {
    setSeconds(60);
  };

  // seconds >= 0 ?

  useEffect(() => {});

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext("2d");

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");

    // set the current color
    const current = {
      color: "black",
    };

    // helper that will update the current color
    const onColorUpdate = (e) => {
      current.color = e.target.className.split(" ")[1];
    };

    // loop through the color elements and add the click event listeners
    for (let i = 0; i < colors.length; i++) {
      colors[i].addEventListener("click", onColorUpdate, false);
    }
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      const drawingContainer = document.getElementById("container");
      const canvasOffsetX = drawingContainer.offsetLeft;
      const canvasOffsetY = drawingContainer.offsetTop;

      context.beginPath();
      context.moveTo(x0 - canvasOffsetX, y0 - canvasOffsetY);
      context.lineTo(x1 - canvasOffsetX, y1 - canvasOffsetY);
      context.strokeStyle = color;
      context.lineWidth = 5;
      context.stroke();
      context.closePath();

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
        current.x, //- canvasOffsetX,
        current.y, // - canvasOffsetY,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
      current.x = e.clientX || e.touches[0].clientX; //- canvasOffsetX;
      current.y = e.clientY || e.touches[0].clientY; //- canvasOffsetY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX, //- canvasOffsetX,
        e.clientY || e.touches[0].clientY, // - canvasOffsetY,
        current.color,
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
    canvas.addEventListener("mousemove", throttle(onMouseMove, 10), false);

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 10), false);

    // -------------- make the canvas fill its parent component -----------------

    canvas.width = 1000;
    canvas.height = 500;

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

    //! ONLY ONE CAN DRAW ATM, LOOK INTO WHY

    // socketRef.current.on("drawing", (onDrawingEvent, gameCode));

    //socketRef.current.on("userList", (userList) => console.log(userList));

    //Disconnecting not fully working, maybe completed rooms may help
  }, []);

  // ------------- The Canvas and color elements --------------------------
  return (
    <div>
      <div style={{ display: "inline-block" }}>
        <span ref={colorsRef} className="colors">
          <div className="color black" />
          <div className="color red" />
          <div className="color green" />
          <div className="color blue" />
          <div className="color yellow" />
        </span>
        <span
          style={{
            backgroundColor: "lightgrey",
            borderRadius: "50px",
            height: "25px",
          }}
        >
          {" "}
          {seconds}{" "}
        </span>
        <span>
          <button onClick={startTimer}>Start</button>
        </span>
      </div>
      <div>
        <div>
          Your game session code is {gameCode ? gameCode : inputtedGameCode}
        </div>
      </div>
      <canvas
        id="container"
        ref={canvasRef}
        style={{
          border: "2px solid black",
          paddingLeft: "0",
          paddingRight: "0",
          marginLeft: "auto",
          marginRight: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Board;

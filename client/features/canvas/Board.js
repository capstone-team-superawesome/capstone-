import { useSelector } from "react-redux";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  const gameCode = useSelector((state) => state.home.createdGameCode);
  const inputtedGameCode = useSelector((state) => state.home.inputtedGameCode);
  const isDrawer = useSelector((state) => state.auth.me.isDrawer);

  //brush
  const brushSizes = [5, 10, 32, 64];
  let brushSize = 5;
  const navigate = useNavigate();

  //Timer
  const [seconds, setSeconds] = useState(60);

  // o: is there a place where you stop the timer?
  const startTimer = () => {
    setInterval(() => {
      setSeconds((seconds) => seconds - 1);
    }, 1000);
  };

  const brushHandler = (size) => {
    brushSize = size;
  };

  const resetTimer = () => {
    setSeconds(60);
  };

  useEffect(() => {
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
      const drawingContainer = document.getElementById("container");
      const canvasOffset = {
        x: drawingContainer.offsetLeft - scrollX,
        y: drawingContainer.offsetTop - scrollY,
      };
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
    <div class="bg-gray-300 m-10 p-10 rounded-2xl">
      <div style={{ display: "inline-block" }}>
        <span ref={colorsRef} className="colors">
          <div className="color black" />
          <div className="color red" />
          <div className="color green" />
          <div className="color blue" />
          <div className="color yellow" />
          <div className="color white" />
        </span>
        <span style={{ marginLeft: "40px" }}>
          {brushSizes.map((size) => (
            <span
              key={size}
              onClick={() => brushHandler(size)}
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
        <span
          style={{
            backgroundColor: "lightgrey",
            borderRadius: "50px",
            height: "25px",
            marginLeft: "200px",
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

      {isDrawer ? (
        <div className="canvas-wrapper">
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
      ) : (
        <div
          className="canvas-wrapper"
          style={{ cursor: "not-allowed", pointerEvents: "none" }}
        >
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
      )}
    </div>
  );
};

export default Board;

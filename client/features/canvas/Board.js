import React, { useRef, useEffect, useState } from "react";
import io from "socket.io-client";

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();
  //const [drawing, setDrawing] = useState(false);

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

      console.log(x0, y0);

      context.beginPath();
      context.moveTo(x0 - canvasOffsetX, y0 - canvasOffsetY);
      context.lineTo(x1 - canvasOffsetX, y1 - canvasOffsetY);
      context.strokeStyle = color;
      context.lineWidth = 5;
      context.stroke();
      context.closePath();

      //emit is necessary for sending the
      if (!emit) {
        return;
      }

      const w = canvas.width;
      const h = canvas.height;

      socketRef.current.emit("drawing", {
        x0: x0 / w,
        y0: y0 / h,
        x1: x1 / w,
        y1: y1 / h,
        color,
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
    socketRef.current.on("drawing", onDrawingEvent);
  }, []);

  // ------------- The Canvas and color elements --------------------------
  return (
    <div>
      <div ref={colorsRef} className="colors">
        <div className="color black" />
        <div className="color red" />
        <div className="color green" />
        <div className="color blue" />
        <div className="color yellow" />
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

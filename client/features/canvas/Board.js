import React, { useRef, useEffect } from "react";
import io from "socket.io-client";

const Board = () => {
  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  useEffect(() => {
    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const test = colorsRef.current;
    const context = canvas.getContext("2d");

    // ----------------------- Colors --------------------------------------------------

    const colors = document.getElementsByClassName("color");

    // o: recommendation, take these out BEFORE merging to main or use debugger
    console.log(colors, "the colors");
    console.log(test);

    // o: current what? ... also, why is this an object?
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

    // o: this should be a stateful variable
    let drawing = false;

    // ------------------------------- create the drawing ----------------------------

    const drawLine = (x0, y0, x1, y1, color, emit) => {
      const drawingContainer = document.getElementById("container");

      // o: you can store this as one object with keys x / y
      const canvasOffsetX = drawingContainer.offsetLeft;
      const canvasOffsetY = drawingContainer.offsetTop;
      console.log("X :", canvasOffsetX, "Y :", canvasOffsetY);

      // o: remove
      console.log(x0, y0, x1, y1, color);
      context.beginPath();
      context.moveTo(x0 - canvasOffsetX, y0 - canvasOffsetY);
      context.lineTo(x1 - canvasOffsetX, y1 - canvasOffsetY);
      context.strokeStyle = color;
      context.lineWidth = 5;
      context.stroke();
      context.closePath();

      // o: why is this happening exactly?
      if (!emit) {
        return;
      }

      // o: w and h 🤔... we can do better here... also, why is this even being
      //  redefined? ... also, why not just destructure?
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

    // o: switch the e's to event
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

    // o: did you do this on your own?
    const throttle = (callback, delay) => {
      let previousCall = new Date().getTime();
      
      return function () {
        const time = new Date().getTime();

        if (time - previousCall >= delay) {
          previousCall = time;
          // o: avoid using arguments... use ...args for clarity
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

    // o: why is this a function?
    const onResize = () => {
      canvas.width = 1000;
      canvas.height = 500;
    };

    //window.addEventListener("resize", onResize, false);
    onResize();

    // ----------------------- socket.io connection ----------------------------
    // o: you can define this inline below
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    socketRef.current = io.connect("/");
    socketRef.current.on("drawing", onDrawingEvent);
  }, []);

  // ------------- The Canvas and color elements --------------------------

  // o: ???
  // className = "whiteboard";
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
      {/* o: remove */}
      {/* <div className="whiteboard">hello</div> */}
    </div>
  );
};

export default Board;

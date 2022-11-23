import React, { useEffect } from "react";

const GuesserCanvas = ({ canvasRef, colorsRef }) => {
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = "1000";
    canvas.height = "500";
  }, []);

  return (
    <div>
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
      <input type="text" placeholder="make a guess"></input>
      <button type="submit">Submit</button>
    </div>
  );
};

export default GuesserCanvas;

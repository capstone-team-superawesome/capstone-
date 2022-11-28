import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPrompts } from "../game/gameSlice";

const DrawerCanvas = ({ colorsRef, brushSizes, canvasRef }) => {
  const dispatch = useDispatch();
  const { prompts } = useSelector((state) => state.game);

  useEffect(() => {
    dispatch(fetchPrompts());
    const canvas = canvasRef.current;
    canvas.width = "1000";
    canvas.height = "500";
  }, []);

  function shuffle(array) {
    let prompts = array.slice();
    let shuffledPrompts = [];

    while (prompts.length) {
      const index = Math.floor(Math.random() * prompts.length);
      shuffledPrompts.push(prompts[index].word);
      prompts.splice(index, 1);
    }
    return shuffledPrompts;
  }

  console.log("original prompts", prompts);
  const randomPrompts = shuffle(prompts);
  console.log("randomPrompts", randomPrompts);
  const prompt =
    randomPrompts[Math.floor(Math.random() * randomPrompts.length)];
  console.log("singular prompt", prompt);

  return (
    <div className="canvas-wrapper">
      <div class="flex justify-center w-1/2 mx-auto">
        <span ref={colorsRef} className="colors">
          <div className="color black" />
          <div className="color red" />
          <div className="color green" />
          <div className="color blue" />
          <div className="color yellow" />
          <div className="color white" />
        </span>
        <span className="brushes" style={{ marginLeft: "40px" }}>
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
      </div>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "32px",
        }}
      >
        You are Drawing: {prompt}
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
        }}
      />
    </div>
  );
};

export default DrawerCanvas;

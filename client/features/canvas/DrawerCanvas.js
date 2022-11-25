import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllPrompts } from "../game/gameSlice";

const DrawerCanvas = ({ colorsRef, currentPrompt, canvasRef }) => {
  const dispatch = useDispatch();
  const { prompts } = useSelector((state) => state.game);

  // const promptList = useRef([]);
  // const currentPrompt = useRef(null);
  // const round = useRef(0);

  useEffect(() => {
    // !currentPrompt.current ? dispatch(fetchAllPrompts()) : null;

    const canvas = canvasRef.current;
    canvas.width = "1000";
    canvas.height = "500";
  }, []);

  // function shuffle(array) {
  //   let prompts = array.slice();
  //   let shuffledPrompts = [];

  //   while (prompts.length) {
  //     const index = Math.floor(Math.random() * prompts.length);
  //     shuffledPrompts.push(prompts[index].word);
  //     prompts.splice(index, 1);
  //   }
  //   return shuffledPrompts;
  // }

  // if (!currentPrompt.current) {
  //   const randomPrompts = shuffle(prompts);
  //   promptList.current[0] = randomPrompts[0];
  //   promptList.current[1] = randomPrompts[1];
  //   promptList.current[2] = randomPrompts[2];
  //   promptList.current[3] = randomPrompts[3];
  //   currentPrompt.current = promptList.current[round.current];
  // }

  return (
    <div className="canvas-wrapper">
      <div style={{ display: "inline-block" }}>
        <span ref={colorsRef} className="colors">
          <div className="color black" />
          <div className="color crimson" />
          <div className="color green" />
          <div className="color blue" />
          <div className="color yellow" />
          <div className="color white" />
        </span>
        {/* <span style={{ marginLeft: "40px" }}>
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
        </span> */}
      </div>
      <div
        style={{
          fontWeight: "bold",
          textAlign: "center",
          fontSize: "32px",
        }}
      >
        You are Drawing: {currentPrompt}
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

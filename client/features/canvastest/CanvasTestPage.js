import React, { useEffect, useRef, useState } from "react";

const canvasTestPage = () => {
  console.log("Canvas test page");
  const [brushSize, setBrushSize] = useState(5);

  const brushHandler = (evt) => {
    console.log(evt.target);
    console.log(evt.target.value);
    Number(evt.target.value) > 0 && Number(evt.target.value) <= 10
      ? setBrushSize(evt.target.value)
      : null;
  };

  return (
    <div className="container">
      <section id="toolbar">
        <h1>Draw</h1>
        <label>Stroke</label>
        <input id="stroke" type="color"></input>
        <label>Brush Size</label>
        <input
          id="brushSize"
          type="number"
          defaultValue={brushSize}
          onChange={brushHandler}
        ></input>
        <button id="clear">Clear</button>
      </section>
    </div>
  );
};

export default canvasTestPage;

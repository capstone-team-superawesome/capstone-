import React from 'react'

const DrawerCanvas = ({colorsRef, brushSizes, canvasRef}) => {
  return (
    <div className="canvas-wrapper">
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
          </div>
          <div
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "32px",
            }}
          >
            You are Drawing: prompt
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
            }}
          />
        </div>
  )
}

export default DrawerCanvas
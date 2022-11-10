const canvas = document.getElementById("canvas");

// The canvas will cover all the space on the screen...set to a container so that canvas is only relegated to one part of the app
canvas.width = 0.5 * window.innerWidth;
canvas.height = 0.5 * window.innerHeight;

var io = io.connect("http://localhost:8080/");

const ctx = canvas.getContext("2d");

let x;
let y;
let mouseDown = false;

window.onmousedown = (e) => {
  ctx.moveTo(x, y);
  mouseDown = true;
};

window.onmouseup = (e) => {
  mouseDown = false;
};

io.on("ondraw", (x, y) => {
  ctx.lineTo(x, y);
  ctx.stroke();
});

window.onmousemove = (e) => {
  x = e.clientX;
  y = e.clientY;

  if (mouseDown) {
    io.emit("draw", (x, y));
    ctx.lineTo(x, y);
    ctx.stroke();
  }
};

const canvas = document.getElementById("canvas");

// The canvas will cover all the space on the screen...set to a container so that canvas is only relegated to one part of the app
canvas.width = 0.5 * window.innerWidth;
canvas.height = 0.5 * window.innerHeight;

var io = io.connect("http://localhost:8080/");

const ctx = canvas.getContext("2d");

var mouse = [0, 0],
  mouseDown = false,
  last = [0, 0];
getMouse = function (e) {
  var X, Y;
  X = e.pageX || e.clientX || e.offsetX;
  Y = e.pageY || e.clientY || e.offsetY;
  X = X - canvas.offsetLeft;
  Y = Y - canvas.offsetTop;
  mouse = [X, Y];
};
canvas.onmousedown = function (e) {
  getMouse(e);
  mouseDown = true;
  last = mouse;
};
canvas.onmouseup = function () {
  mouseDown = false;
};
canvas.onmousemove = getMouse;

setInterval(function () {
  if (mouseDown) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(last[0], last[1]);
    ctx.lineTo(mouse[0], mouse[1]);
    ctx.stroke();
    ctx.closePath();
    last = mouse;
  }
}, 1000 / 24);

// let x;
// let y;
// let mouseDown = false;

// window.onmousedown = (e) => {
//   ctx.moveTo(x, y);
//   mouseDown = true;
// };

// window.onmouseup = (e) => {
//   mouseDown = false;
// };

// io.on("ondraw", (x, y) => {
//   ctx.lineTo(x, y);
//   ctx.stroke();
// });

// window.onmousemove = (e) => {
//   x = e.clientX;
//   y = e.clientY;

//   if (mouseDown) {
//     io.emit("draw", (x, y));
//     ctx.lineTo(x, y);
//     ctx.stroke();
//   }
// };

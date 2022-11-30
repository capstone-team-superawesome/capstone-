// import { useDispatch, useSelector } from "react-redux";
// import React, { useRef, useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import io from "socket.io-client";
// // import DrawerCanvas from "./DrawerCanvas";
// // import GuesserCanvas from "./GuesserCanvas";
// import { fetchPromptList, updateGameSession } from "../game/gameSlice";
// import { makeGameCode, updateInputtedGameCode } from "../home/HomeSlice";

// const Board = () => {
//   const dispatch = useDispatch();
//   const canvasRef = useRef(null);
//   const colorsRef = useRef(null);
//   const socketRef = useRef();

//   const { gameSession } = useSelector((state) => state.game);

//   const promptList = useRef([]);
//   const currentRound = useRef(1);

//   if (gameSession && gameSession[0]) {
//     promptList.current = gameSession[0].promptList || gameSession.round;
//     currentRound.current = gameSession[0].round || gameSession.round;
//   }

//   const [guess, setGuess] = useState("");
//   const [pastGuesses, setPastGuesses] = useState([
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//     "",
//   ]);

//   const [notification, setNotification] = useState(
//     "Waiting for player to join..."
//   );

//   const gameCode = useSelector((state) => state.home.createdGameCode);
//   const inputtedGameCode = useSelector((state) => state.home.inputtedGameCode);
//   //const { promptList } = useSelector((state) => state.game.promptList);
//   const isDrawer = useSelector((state) => state.auth.me.isDrawer);
//   const { id, totalScore } = useSelector((state) => state.auth.me);

//   const navigate = useNavigate();

//   //Timer
//   const [seconds, setSeconds] = useState(60);

//   const beginGame = () => {
//     socketRef.current.emit("beginTimer", { gameCode });
//   };

//   //when time is 0
//   const resetTimer = () => {
//     setSeconds(60);
//   };

//   const handleSubmit = () => {
//     const promptList = gameSession.promptList;
//     const round = gameSession.round;

//     if (pastGuesses.length < 10) {
//       pastGuesses.push(guess);
//     } else {
//       pastGuesses.shift();
//       pastGuesses.push(guess);
//     }
//     setCounter(counter + 1);
//     setCounter(counter - 1);
//     console.log(pastGuesses);

//     if (guess.toLowerCase() === promptList[round].toLowerCase()) {
//       console.log("you got it!");
//       const score = totalScore + 1000;
//       dispatch(addScore({ id: id, score: score }));
//       socketRef.current.emit("guessMade", true);
//       navigate("/scorePage");
//     }
//   };

//   useEffect(() => {
//     //prompts
//     if (gameCode) {
//       dispatch(fetchPromptList({ createdGameCode: gameCode }));
//     } else {
//       dispatch(fetchPromptList({ createdGameCode: inputtedGameCode }));
//     }
//     window.scrollTo({ top: 240, left: 0, behavior: "smooth" });

//     // --------------- getContext() method returns a drawing context on the canvas-----

//     const canvas = canvasRef.current;
//     const context = canvas.getContext("2d");

//     // canvas.width = "1000";
//     // canvas.height = "500";
//     // ----------------------- Colors --------------------------------------------------

//     const colors = document.getElementsByClassName("color");

//     // set the current color
//     const current = {
//       color: "black",
//     };

//     // helper that will update the current color
//     const onColorUpdate = (event) => {
//       current.color = event.target.className.split(" ")[1];
//     };

//     // loop through the color elements and add the click event listeners
//     for (let i = 0; i < colors.length; i++) {
//       colors[i].addEventListener("click", onColorUpdate, false);
//     }

//     //we started using useState, but app started breaking, so we kept as is
//     let drawing = false;

//     // ------------------------------- create the drawing ----------------------------

//     const drawLine = (x0, y0, x1, y1, color, emit) => {
//       const drawingContainer = document.getElementById("container-canvas");

//       const canvasOffset = {
//         x: drawingContainer.offsetLeft - scrollX,
//         y: drawingContainer.offsetTop - scrollY,
//       };
//       context.beginPath();

//       context.moveTo(x0 - canvasOffset.x, y0 - canvasOffset.y);
//       context.lineTo(x1 - canvasOffset.x, y1 - canvasOffset.y);
//       context.strokeStyle = color;
//       context.lineWidth = 5;

//       context.fillStyle = color;
//       context.strokeStyle = color;

//       context.fill();
//       context.stroke();
//       context.closePath();

//       //when we took this line out, drawing started flickering in canvas
//       if (!emit) {
//         return;
//       }

//       const roomName = gameCode ? gameCode : inputtedGameCode;

//       const { width, height } = canvas;
//       socketRef.current.emit("drawing", {
//         x0: x0 / width,
//         y0: y0 / height,
//         x1: x1 / width,
//         y1: y1 / height,
//         color,
//         roomName,
//       });
//     };

//     // ---------------- mouse movement --------------------------------------

//     const onMouseDown = (event) => {
//       drawing = true;
//       current.x = event.clientX || event.touches[0].clientX;
//       current.y = event.clientY || event.touches[0].clientY;
//     };

//     const onMouseMove = (event) => {
//       if (!drawing) {
//         return;
//       }
//       drawLine(
//         current.x,
//         current.y,
//         event.clientX || event.touches[0].clientX,
//         event.clientY || event.touches[0].clientY,
//         current.color,
//         true
//       );
//       current.x = event.clientX || event.touches[0].clientX;
//       current.y = event.clientY || event.touches[0].clientY;
//     };

//     const onMouseUp = (event) => {
//       if (!drawing) {
//         return;
//       }
//       drawing = false;
//       drawLine(
//         current.x,
//         current.y,
//         event.clientX || event.touches[0].clientX,
//         event.clientY || event.touches[0].clientY,
//         current.color,
//         true
//       );
//     };

//     // ----------- limit the number of events per second -----------------------

//     const throttle = (callback, delay) => {
//       let previousCall = new Date().getTime();
//       return function (...args) {
//         const time = new Date().getTime();

//         if (time - previousCall >= delay) {
//           previousCall = time;
//           callback.apply(null, args);
//         }
//       };
//     };

//     // -----------------add event listeners to our canvas ----------------------

//     canvas.addEventListener("mousedown", onMouseDown, false);
//     canvas.addEventListener("mouseup", onMouseUp, false);
//     canvas.addEventListener("mouseout", onMouseUp, false);
//     canvas.addEventListener("mousemove", throttle(onMouseMove, 0.001), false);

//     // Touch support for mobile devices
//     canvas.addEventListener("touchstart", onMouseDown, false);
//     canvas.addEventListener("touchend", onMouseUp, false);
//     canvas.addEventListener("touchcancel", onMouseUp, false);
//     canvas.addEventListener("touchmove", throttle(onMouseMove, 1), false);

//     // -------------- make the canvas fill its parent component -----------------

//     // canvas.width = "1000";
//     // canvas.height = "500";

//     // ----------------------- socket.io connection ----------------------------
//     const onDrawingEvent = (data) => {
//       const { width, height } = canvas;
//       drawLine(
//         data.x0 * width,
//         data.y0 * height,
//         data.x1 * width,
//         data.y1 * height,
//         data.color
//       );
//     };

//     socketRef.current = io.connect("/");

//     if (inputtedGameCode) {
//       socketRef.current.emit("joinRoom", inputtedGameCode);
//       socketRef.current.on("drawing", onDrawingEvent);
//     } else {
//       socketRef.current.emit("joinRoom", gameCode);
//       socketRef.current.on("drawing", onDrawingEvent);
//     }

//     //timer
//     socketRef.current.on("timer", (count) => {
//       setSeconds(count);
//     });

//     socketRef.current.on("guessReceived", (data) => {
//       if (data) {
//         const score = totalScore + 1000;
//         dispatch(addScore({ id: id, score: score }));
//         navigate("/scorePage");
//       }
//     });

//     //listen for new user event which sends room information
//     socketRef.current.on("new user", (rooms) => {
//       console.log("Front end rooms", rooms);
//     });

//     socketRef.current.on("room_full", (data) => {
//       if (data) {
//         console.log("INSIDE ROOM_FULL FRONT END");
//         setNotification("Player has joined, start drawing!");
//       }
//     });

//     function newGameCode() {
//       let result = "";
//       let characters =
//         "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//       let charactersLength = characters.length;
//       for (let i = 0; i < 6; i++) {
//         result += characters.charAt(
//           Math.floor(Math.random() * charactersLength)
//         );
//       }
//       window.localStorage.setItem("gameCode", result);
//       return result;
//     }

//     socketRef.current.on("refuse_connection", () => {
//       dispatch(updateInputtedGameCode(newGameCode()));
//       navigate("/home");

//       alert("Gameroom is full, try a different code");
//     });

//     socketRef.current.on("disconnect", (msg) => {
//       //dispatch(updateInputtedGameCode(""));
//       // dispatch(makeGameCode(5));
//       console.log(msg);
//     });
//   }, []);

//   // ------------- The Canvas and color elements --------------------------
//   return (
//     <div className="bg-gray-300 m-10 p-10 rounded-2xl">
//       <div class="flex flex-col justify-center align-center my-5">
//         <div class="text-center align-middle text-xl mb-15">
//           <b>TIME TO DRAW: </b>
//           {seconds} seconds
//         </div>
//         <button
//           class="w-1/4 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 mx-auto self-center text-xl transition-colors duration-300 ease-in-out hover:text-white"
//           onClick={beginGame}
//         >
//           Begin!
//         </button>
//       </div>

//       {/* <div class="my-10">
//         <div class="text-center align-middle text-xl mt-5">
//           Your game session code is {gameCode ? gameCode : inputtedGameCode}
//         </div>
//       </div> */}

//       {isDrawer ? (
//         <div>
//           <div>
//             <div>Your game session code is {gameCode ? gameCode : null}</div>
//             <h3 class="text-center align-middle text-xl mt-5 m-2">
//               {notification}
//             </h3>
//           </div>
//           <span>
//             <span style={{ display: "inline-block" }}>
//               <span ref={colorsRef} className="colors">
//                 <div className="color black" />
//                 <div className="color crimson" />
//                 <div className="color green" />
//                 <div className="color blue" />
//                 <div className="color yellow" />
//                 <div className="color white" />
//               </span>
//             </span>
//             <span
//               style={{
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 fontSize: "32px",
//                 marginLeft: "10%",
//               }}
//             >
//               You are Drawing:{" "}
//               {gameSession ? promptList.current[currentRound.current] : null}
//             </span>
//           </span>
//           <canvas
//             id="container-canvas"
//             ref={canvasRef}
//             style={{
//               backgroundColor: "white",
//               border: "2px solid black",
//               paddingLeft: "0",
//               paddingRight: "0",
//               marginLeft: "auto",
//               marginRight: "auto",
//               display: "block",
//               backgroundColor: "white",
//             }}
//           />
//         </div>
//       ) : (
//         <div>
//           <div class="my-10">
//             <div class="text-center align-middle text-xl mt-5 m-2">
//               Your game session code is{" "}
//               {inputtedGameCode ? inputtedGameCode : null}
//             </div>
//             <h3 class="text-center align-middle text-xl mt-5 m-2">
//               You have joined the session
//             </h3>
//           </div>
//           <div className="guesserBar">
//             <span
//               classname="guesserBarColumn"
//               style={{
//                 float: "left",
//                 width: "33%",
//               }}
//             >
//               <span ref={colorsRef} className="colors">
//                 <div className="color black" />
//                 <div className="color crimson" />
//                 <div className="color green" />
//                 <div className="color blue" />
//                 <div className="color yellow" />
//                 <div className="color white" />
//               </span>
//             </span>
//             <span
//               classname="guesserBarColumn"
//               style={{
//                 fontWeight: "bold",
//                 textAlign: "center",
//                 fontSize: "32px",
//                 float: "left",
//                 width: "33%",
//               }}
//             >
//               You are guessing
//             </span>
//             <span
//               classname="guesserBarColumn"
//               style={{
//                 float: "left",
//                 width: "33%",
//                 //zIndex:"1000"
//               }}
//             >
//               <input
//                 type="text"
//                 placeholder="make a guess"
//                 onChange={(event) => setGuess(event.target.value)}
//                 style={{ width: "auto" }}
//               ></input>
//               <button
//                 type="submit"
//                 onClick={handleSubmit}
//                 style={{ marginLeft: "25px" }}
//               >
//                 Submit
//               </button>
//               <div
//                 style={{
//                   position: "absolute",
//                   bottom: "9em",
//                   right: "18em",
//                   height: "150px",
//                   overflow: "scroll",
//                   zIndex: "1000",
//                   opacity: "50%",
//                 }}
//               >
//                 {pastGuesses.length
//                   ? pastGuesses.map((guess, index) => (
//                       <div key={index}>{guess}</div>
//                     ))
//                   : null}
//               </div>
//             </span>
//           </div>
//           <div
//             className="canvas-wrapper"
//             style={{ cursor: "not-allowed", pointerEvents: "none" }}
//           >
//             <canvas
//               id="container-canvas"
//               ref={canvasRef}
//               style={{
//                 backgroundColor: "white",
//                 border: "2px solid black",
//                 paddingLeft: "0",
//                 paddingRight: "0",
//                 marginLeft: "auto",
//                 marginRight: "auto",
//                 display: "block",
//                 backgroundColor: "white",
//               }}
//             />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Board;

import React, { useRef, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchPromptList, updateGameSession } from "../game/gameSlice";
import { makeGameCode, updateInputtedGameCode } from "../home/HomeSlice";

import io from "socket.io-client";

const Board = () => {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);
  const colorsRef = useRef(null);
  const socketRef = useRef();

  const { gameSession } = useSelector((state) => state.game);

  const promptList = useRef([]);
  const currentRound = useRef(1);

  if (gameSession && gameSession[0]) {
    promptList.current = gameSession[0].promptList || gameSession.round;
    currentRound.current = gameSession[0].round || gameSession.round;
  }

  const [guess, setGuess] = useState("");
  const [pastGuesses, setPastGuesses] = useState([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  const [notification, setNotification] = useState(
    "Waiting for player to join..."
  );

  const gameCode = useSelector((state) => state.home.createdGameCode);
  const inputtedGameCode = useSelector((state) => state.home.inputtedGameCode);
  //const { promptList } = useSelector((state) => state.game.promptList);
  const isDrawer = useSelector((state) => state.auth.me.isDrawer);
  const { id, totalScore } = useSelector((state) => state.auth.me);

  const navigate = useNavigate();

  //Timer
  const [seconds, setSeconds] = useState(60);

  const beginGame = () => {
    //socketRef.current.emit("beginTimer", { gameCode });
  };

  //when time is 0
  const resetTimer = () => {
    setSeconds(60);
  };

  const handleSubmit = () => {
    const promptList = gameSession.promptList;
    const round = gameSession.round;

    if (pastGuesses.length < 10) {
      pastGuesses.push(guess);
    } else {
      pastGuesses.shift();
      pastGuesses.push(guess);
    }
    setCounter(counter + 1);
    setCounter(counter - 1);
    console.log(pastGuesses);

    if (guess.toLowerCase() === promptList[round].toLowerCase()) {
      console.log("you got it!");
      const score = totalScore + 1000;
      dispatch(addScore({ id: id, score: score }));
      //socketRef.current.emit("guessMade", true);
      navigate("/scorePage");
    }
  };

  useEffect(() => {
    if (gameCode) {
      dispatch(fetchPromptList({ createdGameCode: gameCode }));
    } else {
      dispatch(fetchPromptList({ createdGameCode: inputtedGameCode }));
    }
    window.scrollTo({ top: 240, left: 0, behavior: "smooth" });

    // --------------- getContext() method returns a drawing context on the canvas-----

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // canvas.width = 1000;
    // canvas.height = 500;

    console.log("CANVAS BOARD ", canvas);

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
      const drawingContainer = document.getElementById("container-canvas");

      const canvasOffset = {
        x: drawingContainer.offsetLeft - scrollX,
        y: drawingContainer.offsetTop - scrollY,
      };

      context.beginPath();

      context.moveTo(x0 - canvasOffset.x, y0 - canvasOffset.y);
      context.lineTo(x1 - canvasOffset.x, y1 - canvasOffset.y);
      context.strokeStyle = color;
      context.fillStyle = color;
      context.lineWidth = 5;
      context.fill();
      context.stroke();
      context.closePath();

      // if (!emit) {
      //   return;
      // }
      const w = canvas.width;
      const h = canvas.height;

      const roomName = gameCode ? gameCode : inputtedGameCode;

      // socketRef.current.emit("drawing", {
      //   x0: x0 / w,
      //   y0: y0 / h,
      //   x1: x1 / w,
      //   y1: y1 / h,
      //   color,
      //   roomName,
      // });
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
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
        current.color,
        true
      );
      current.x = e.clientX || e.touches[0].clientX;
      current.y = e.clientY || e.touches[0].clientY;
    };

    const onMouseUp = (e) => {
      if (!drawing) {
        return;
      }
      drawing = false;
      drawLine(
        current.x,
        current.y,
        e.clientX || e.touches[0].clientX,
        e.clientY || e.touches[0].clientY,
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
    canvas.addEventListener("mousemove", throttle(onMouseMove, 0.001), false);

    // Touch support for mobile devices
    canvas.addEventListener("touchstart", onMouseDown, false);
    canvas.addEventListener("touchend", onMouseUp, false);
    canvas.addEventListener("touchcancel", onMouseUp, false);
    canvas.addEventListener("touchmove", throttle(onMouseMove, 1), false);

    // -------------- make the canvas fill its parent component -----------------

    // const onResize = () => {
    //   canvas.width = window.innerWidth;
    //   canvas.height = window.innerHeight;
    // };

    // window.addEventListener("resize", onResize, false);
    // onResize();

    // ----------------------- socket.io connection ----------------------------
    const onDrawingEvent = (data) => {
      const w = canvas.width;
      const h = canvas.height;
      isDrawer
        ? console.log("INSIDE ON DRAWING EVENT drawer side", data)
        : console.log("INSIDE ON DRAWING EVENT guesser side", data);

      drawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color);
    };

    socketRef.current = io.connect("/");

    // if (inputtedGameCode) {
    //   socketRef.current.emit("joinRoom", inputtedGameCode);
    // } else {
    //   socketRef.current.emit("joinRoom", gameCode);
    // }

    // socketRef.current.on("drawing", onDrawingEvent);

    //timer
    socketRef.current.on("timer", (count) => {
      setSeconds(count);
    });

    socketRef.current.on("guessReceived", (data) => {
      if (data) {
        const score = totalScore + 1000;
        dispatch(addScore({ id: id, score: score }));
        navigate("/scorePage");
      }
    });

    //listen for new user event which sends room information
    socketRef.current.on("new user", (rooms) => {
      console.log("Front end rooms", rooms);
    });

    socketRef.current.on("room_full", (data) => {
      if (data) {
        console.log("INSIDE ROOM_FULL FRONT END");
        setNotification("Player has joined, start drawing!");
      }
    });

    function newGameCode() {
      let result = "";
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength)
        );
      }
      window.localStorage.setItem("gameCode", result);
      return result;
    }

    socketRef.current.on("refuse_connection", () => {
      dispatch(updateInputtedGameCode(newGameCode()));
      navigate("/home");

      alert("Gameroom is full, try a different code");
    });

    socketRef.current.on("disconnect", (msg) => {
      //dispatch(updateInputtedGameCode(""));
      // dispatch(makeGameCode(5));
      console.log(msg);
    });
  }, []);

  // ------------- The Canvas and color elements --------------------------

  return (
    <div className="bg-gray-300 m-10 p-10 rounded-2xl">
      <div class="flex flex-col justify-center align-center my-5">
        <div class="text-center align-middle text-xl mb-15">
          <b>TIME TO DRAW: </b>
          {seconds} seconds
        </div>
        <button
          class="w-1/4 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 mx-auto self-center text-xl transition-colors duration-300 ease-in-out hover:text-white"
          onClick={beginGame}
        >
          Begin!
        </button>
      </div>

      {/* <div class="my-10">
      <div class="text-center align-middle text-xl mt-5">
        Your game session code is {gameCode ? gameCode : inputtedGameCode}
      </div>
    </div> */}

      {isDrawer ? (
        <div>
          <div>
            <div>Your game session code is {gameCode ? gameCode : null}</div>
            <h3 class="text-center align-middle text-xl mt-5 m-2">
              {notification}
            </h3>
          </div>
          <span>
            <span style={{ display: "inline-block" }}>
              <span ref={colorsRef} className="colors">
                <div className="color black" />
                <div className="color crimson" />
                <div className="color green" />
                <div className="color blue" />
                <div className="color yellow" />
                <div className="color white" />
              </span>
            </span>
            <span
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "32px",
                marginLeft: "10%",
              }}
            >
              You are Drawing:{" "}
              {gameSession ? promptList.current[currentRound.current] : null}
            </span>
          </span>
          <canvas
            id="container-canvas"
            ref={canvasRef}
            width="1000"
            height="500"
            style={{
              backgroundColor: "white",
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
      ) : (
        <div>
          <div class="my-10">
            <div class="text-center align-middle text-xl mt-5 m-2">
              Your game session code is{" "}
              {inputtedGameCode ? inputtedGameCode : null}
            </div>
            <h3 class="text-center align-middle text-xl mt-5 m-2">
              You have joined the session
            </h3>
          </div>
          <div className="guesserBar">
            <span
              className="guesserBarColumn"
              style={{
                float: "left",
                width: "33%",
              }}
            >
              <span ref={colorsRef} className="colors">
                <div className="color black" />
                <div className="color crimson" />
                <div className="color green" />
                <div className="color blue" />
                <div className="color yellow" />
                <div className="color white" />
              </span>
            </span>
            <span
              className="guesserBarColumn"
              style={{
                fontWeight: "bold",
                textAlign: "center",
                fontSize: "32px",
                float: "left",
                width: "33%",
              }}
            >
              You are guessing
            </span>
            <span
              className="guesserBarColumn"
              style={{
                float: "left",
                width: "33%",
                //zIndex:"1000"
              }}
            >
              <input
                type="text"
                placeholder="make a guess"
                onChange={(event) => setGuess(event.target.value)}
                style={{ width: "auto" }}
              ></input>
              <button
                type="submit"
                onClick={handleSubmit}
                style={{ marginLeft: "25px" }}
              >
                Submit
              </button>
              <div
                style={{
                  position: "absolute",
                  bottom: "9em",
                  right: "18em",
                  height: "150px",
                  overflow: "scroll",
                  zIndex: "1000",
                  opacity: "50%",
                }}
              >
                {pastGuesses.length
                  ? pastGuesses.map((guess, index) => (
                      <div key={index}>{guess}</div>
                    ))
                  : null}
              </div>
            </span>
          </div>
          <div
            className="canvas-wrapper"
            style={{ cursor: "not-allowed", pointerEvents: "none" }}
          >
            <canvas
              id="container-canvas"
              ref={canvasRef}
              width="1000"
              height="500"
              style={{
                backgroundColor: "white",
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
        </div>
      )}
    </div>
  );
};

export default Board;

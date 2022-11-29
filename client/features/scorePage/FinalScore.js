import React from "react";
import { useNavigate } from "react-router-dom";
import { updateInputtedGameCode, makeGameCode } from "../home/HomeSlice";
import { useDispatch } from "react-redux";

const FinalScore = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const restart = () => {
    console.log("HELLOOOOOOOOO");
    let result = "";
    let characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    window.localStorage.setItem("gameCode", result);
    dispatch(updateInputtedGameCode(result));
    dispatch(makeGameCode(5));

    navigate("/home");
  };

  return (
    <div class="w-3/4 flex-col justify-center mx-auto my-20">
      <button
        class="w-1/2 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 transition-colors duration-300 ease-in-out hover:text-white mx-auto self-center text-xl "
        onClick={restart}
      >
        Play again!
      </button>
      <img class="w-full" src="img/Final-score-background.gif" />
    </div>
  );
};

export default FinalScore;

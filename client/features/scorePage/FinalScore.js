import React from "react";
import { useNavigate } from "react-router-dom";

const FinalScore = () => {
  const navigate = useNavigate();

  return (
    <div class="w-3/4 flex-col justify-center mx-auto my-10 ">
      <button
        class="w-1/2 bg-blue-400 hover:bg-blue-500 text-black font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 transition-colors duration-300 ease-in-out hover:text-white self-center text-xl flex text-center mx-auto mb-10"
        onClick={() => navigate("/home")}
      >
        <span class="text-center mx-auto">Play again!</span>
      </button>
      <img class="w-full" src="img/Final-score-background.gif" />
    </div>
  );
};

export default FinalScore;

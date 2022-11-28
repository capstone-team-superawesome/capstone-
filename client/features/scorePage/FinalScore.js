import React from "react";
import { useNavigate } from "react-router-dom";

const FinalScore = () => {
  const navigate = useNavigate();

  return (
    <div class="w-3/4 flex-col justify-center mx-auto my-20">
      <button
        class="w-1/2 bg-blue-400 hover:bg-blue-500 text-white font-serif py-2  border-b-4 border-blue-700 hover:border-blue-500 rounded hover:shadow-lg hover:shadow-cyan-500 mx-auto"
        onClick={() => navigate("/home")}
      >
        Play again!
      </button>
      <img class="w-full" src="img/Final-score-background.gif" />
    </div>
  );
};

export default FinalScore;

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { resetQuiz } from "../redux/quizSlice";
import { useNavigate } from "react-router-dom";

const Results = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { score, questions } = useSelector((state) => state.quiz);

  const handleRestart = () => {
    dispatch(resetQuiz());
    navigate("/");
  };

  return (
    <div class="p-2 bg-themeLightPink text-white flex items-center justify-center flex-col h-full">
      <h2>Wynik:</h2>
      <p>
        Osiągnąłeś <strong>{score}</strong> z <strong>{questions.length} pytań!!!</strong>
      </p>
      <button class="bg-themePink p-3 border-radius rounded my-1 hover:bg-themeDarkPink" onClick={handleRestart}>Rizzuj mnie raz jeszcze</button>
    </div>
  );
};

export default Results;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const QuizConfiguration = () => {
  const navigate = useNavigate();
  const [questionCount, setQuestionCount] = useState(5);
  const [category, setCategory] = useState("");
  const [customQuiz, setCustomQuiz] = useState([]);

  const handleStartRandomQuiz = () => {
    navigate("/quiz", { state: { type: "random", numberOfQuestions: questionCount } });
  };

  const handleStartCategoryQuiz = () => {
    if (!category) return;
    navigate("/quiz", { state: { type: "category", category, numberOfQuestions: questionCount } });
  };

  const handleStartCustomQuiz = () => {
    if (customQuiz.length === 0) return;
    navigate("/quiz", { state: { type: "custom", questions: customQuiz } });
  };

  return (
    <div className="bg-themeLightPink min-h-screen flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-themeDarkPink mb-6">Konfiguracja Quizu</h1>
      
      {/* Losowy quiz */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-themeDarkPink mb-3">Losowy quiz</h2>
        <input
          type="number"
          min="1"
          value={questionCount}
          onChange={(e) => setQuestionCount(parseInt(e.target.value))}
          className="border p-2 rounded w-full mb-3"
        />
        <button onClick={handleStartRandomQuiz} className="w-full bg-themePink text-white py-2 rounded hover:bg-themeDarkPink">
          Rozpocznij losowy quiz
        </button>
      </div>
      
      {/* Quiz z kategorii */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg mb-6">
        <h2 className="text-xl font-semibold text-themeDarkPink mb-3">Quiz z kategorii</h2>
        <input
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 rounded w-full mb-3"
          placeholder="Podaj nazwę kategorii"
        />
        <button onClick={handleStartCategoryQuiz} className="w-full bg-themePink text-white py-2 rounded hover:bg-themeDarkPink">
          Rozpocznij quiz z kategorii
        </button>
      </div>
      
      {/* Własny quiz */}
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-xl font-semibold text-themeDarkPink mb-3">Własny quiz</h2>
        <button onClick={handleStartCustomQuiz} className="w-full bg-themePink text-white py-2 rounded hover:bg-themeDarkPink" disabled={customQuiz.length === 0}>
          Rozpocznij własny quiz
        </button>
      </div>
    </div>
  );
};

export default QuizConfiguration;

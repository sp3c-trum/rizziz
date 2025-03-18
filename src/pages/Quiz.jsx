import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { answerQuestion, setQuestions } from "../redux/quizSlice";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Timer from "../components/Timer";

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { fetchQuestions } = useAuth();
  const { questions, currentQuestionIndex } = useSelector((state) => state.quiz);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [loading, setLoading] = useState(true);

  // Pobranie pytań z Firebase (miej nadzieję że połączenie dalej działa) ((zrób coś z tymi danymi w koncu))
  useEffect(() => {
    const loadQuestions = async () => {
      const fetchedQuestions = await fetchQuestions();
      dispatch(setQuestions(fetchedQuestions));
      setLoading(false);
    };

    loadQuestions();
  }, [dispatch, fetchQuestions]);

  if (loading) {
    return <p>Ładowanie quizzu...</p>;
  }

  if (!questions.length) {
    return <p>Nie ma pytań, dodaj jakieś.</p>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="p-2 bg-themeLightPink text-white flex items-center justify-center flex-col h-full">
        <p>Quiz zakończony!</p>
        <button class="bg-themePink p-3 border-radius rounded my-1 hover:bg-themeDarkPink" onClick={() => navigate("/results")}>Zobacz wynik</button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect) => {
    setShowCorrectAnswer(true);
    setTimeout(() => {
      dispatch(answerQuestion(isCorrect));
      setShowCorrectAnswer(false);
    }, 2000); // 2 sekundy na pokazanie poprawnej odpowiedzi (zmień po testach, może za krótko/długo)
  };

  return (
    <div className="p-2 bg-themeLightPink text-white flex items-center justify-center flex-col h-full">
      <p className="text-xl mb-4">{`Pytanie ${currentQuestionIndex + 1} z ${questions.length}`}</p>
      <Timer initialTime={currentQuestion.timeLimit} onTimeUp={() => handleAnswer(false)} />
      <div className="container bg-themePink rounded p-4 flex flex-col justify-between min-h-125">
        <h2 className="text-center text-7xl">{currentQuestion.questionText}</h2>
        <div className="flex flex-col space-y-2 mt-4">
          {currentQuestion.answers.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswer(option === currentQuestion.correctAnswer)}
              className="p-2 bg-themeDarkPink text-white rounded"
            >
              {option}
            </button>
          ))}
        </div>
        {showCorrectAnswer && <p>Poprawna odpowiedź: <strong>{currentQuestion.correctAnswer}</strong></p>}
      </div>
    </div>
  );
  
  
};

export default Quiz;

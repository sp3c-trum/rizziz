import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { answerQuestion, setQuestions } from "../redux/quizSlice";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { motion } from "framer-motion";
import Timer from "../components/Timer";

const Quiz = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { fetchQuestions, fetchSavedQuiz } = useAuth();
  const { questions, currentQuestionIndex } = useSelector((state) => state.quiz);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [loading, setLoading] = useState(true);

  const { numberOfQuestions, category, savedQuizId } = location.state || {};

  useEffect(() => {
    const loadQuestions = async () => {
      let fetchedQuestions = [];

      if (savedQuizId) {
        fetchedQuestions = await fetchSavedQuiz(savedQuizId);
      } else {
        const allQuestions = await fetchQuestions();
        fetchedQuestions = category
          ? allQuestions.filter((q) => q.category === category)
          : allQuestions;

        if (numberOfQuestions) {
          fetchedQuestions = fetchedQuestions.sort(() => 0.5 - Math.random()).slice(0, numberOfQuestions);
        }
      }

      dispatch(setQuestions(fetchedQuestions));
      setLoading(false);
    };

    loadQuestions();
  }, [dispatch, fetchQuestions, fetchSavedQuiz, category, numberOfQuestions, savedQuizId]);

  if (loading) {
    return <p>Ładowanie quizu...</p>;
  }

  if (!questions.length) {
    return <p>Nie ma pytań spełniających kryteria. Spróbuj ponownie.</p>;
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div className="p-6 bg-themeLightPink text-white flex items-center justify-center flex-col h-full">
        <p className="text-2xl font-semibold">Quiz zakończony!</p>
        <button className="bg-themePink p-4 rounded-lg my-2 hover:bg-themeDarkPink transition" onClick={() => navigate("/results")}>
          Zobacz wynik
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (isCorrect, option) => {
    setSelectedAnswer(option);
    setShowCorrectAnswer(true);
    setTimeout(() => {
      dispatch(answerQuestion(isCorrect));
      setShowCorrectAnswer(false);
      setSelectedAnswer(null);
    }, 2000);
  };

  return (
    <div className="p-6 bg-themeLightPink text-white flex items-center justify-center flex-col h-screen">
      <p className="text-lg font-semibold">Pytanie {currentQuestionIndex + 1} z {questions.length}</p>
      <Timer initialTime={currentQuestion.timeLimit} onTimeUp={() => handleAnswer(false)} />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="container bg-white text-themeDarkPink rounded-2xl p-6 shadow-xl flex flex-col justify-between min-h-[300px] w-[80%] max-w-xl"
      >
        <h2 className="text-center text-3xl font-bold mb-4">{currentQuestion.questionText}</h2>
        <div className="flex flex-col space-y-3">
          {currentQuestion.answers.map((option, index) => (
            <motion.button
              key={index}
              onClick={() => handleAnswer(option === currentQuestion.correctAnswer, option)}
              className={`p-3 text-lg font-semibold rounded-lg transition-all duration-500 ${
                selectedAnswer
                  ? option === currentQuestion.correctAnswer
                    ? "bg-green-500 text-white"
                    : option === selectedAnswer
                    ? "bg-red-500 text-white"
                    : "blur-sm opacity-50"
                  : "bg-themeDarkPink text-white hover:bg-themePink"
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {option}
            </motion.button>
          ))}
        </div>
        {showCorrectAnswer && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-xl mt-4 font-bold">
            Poprawna odpowiedź: <span className="text-green-500">{currentQuestion.correctAnswer}</span>
          </motion.p>
        )}
      </motion.div>
    </div>
  );
};

export default Quiz;

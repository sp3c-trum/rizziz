import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import Notification from "../components/Notification";

const CreateQuestion = () => {
  const { addQuestion } = useAuth();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [category, setCategory] = useState("");
  const [isOpenEnded, setIsOpenEnded] = useState(false);
  const [notification, setNotification] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!questionText || !category) {
      setNotification("Uzupełnij wszystkie pola!");
      return;
    }

    if (!isOpenEnded && (options.length === 0 || !correctAnswer)) {
      setNotification("Musisz dodać przynajmniej jedną odpowiedź i wybrać poprawną!");
      return;
    }

    if (isOpenEnded && !correctAnswer) {
      setNotification("Musisz podać poprawną odpowiedź dla pytania otwartego!");
      return;
    }

    await addQuestion(questionText, options, correctAnswer, timeLimit, category, isOpenEnded);

    setQuestionText("");
    setOptions([]);
    setCorrectAnswer("");
    setTimeLimit(30);
    setCategory("");
    setIsOpenEnded(false);

    console.log("Formularz wysłany!")
    setNotification("✅ Dodano pytanie pomyślnie!");
  };

  return (
    <div className="p-6 bg-themeWhite min-h-full flex flex-col items-center">
      <h1 className="text-3xl font-semibold text-themeDarkerPink mb-6">Stwórz pytanie!</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
        <label className="block text-lg font-medium text-themeDarkPink mb-2">Pytanie:</label>
        <input 
          type="text" 
          value={questionText} 
          onChange={(e) => setQuestionText(e.target.value)} 
          required 
          className="w-full p-2 border rounded-lg mb-4 bg-themeLightPink"
        />

        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            checked={isOpenEnded}
            onChange={() => setIsOpenEnded(!isOpenEnded)}
            className="mr-2"
          />
          <label className="text-themeDarkPink">Czy to pytanie otwarte?</label>
        </div>

        {isOpenEnded ? (
          <div className="mb-4">
            <label className="block text-lg font-medium text-themeDarkPink">Poprawna odpowiedź:</label>
            <input
              type="text"
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-themeLightPink"
            />
          </div>
        ) : (
          <>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={option}
                  onChange={(e) => {
                    const newOptions = [...options];
                    newOptions[index] = e.target.value;
                    setOptions(newOptions);
                  }}
                  required
                  className="w-full p-2 border rounded-lg bg-themeLightPink"
                />
                <button
                  type="button"
                  onClick={() => setOptions(options.filter((_, i) => i !== index))}
                  className="ml-2 bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={() => setOptions([...options, ""])}
              className="w-full bg-themePink text-white p-2 rounded-lg mt-2 hover:bg-themeDarkPink"
            >
              Dodaj opcję +
            </button>

            <label className="block text-lg font-medium text-themeDarkPink mt-4">Poprawna odpowiedź:</label>
            <select 
              value={correctAnswer} 
              onChange={(e) => setCorrectAnswer(e.target.value)} 
              required
              className="w-full p-2 border rounded-lg bg-themeLightPink mb-4"
            >
              <option value="">Wybierz</option>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </>
        )}

        <label className="block text-lg font-medium text-themeDarkPink">Limit czasowy:</label>
        <input 
          type="number" 
          value={timeLimit} 
          onChange={(e) => setTimeLimit(e.target.value)} 
          min="5" 
          required 
          className="w-full p-2 border rounded-lg bg-themeLightPink mb-4"
        />

        <label className="block text-lg font-medium text-themeDarkPink">Kategoria:</label>
        <input 
          type="text" 
          value={category} 
          onChange={(e) => setCategory(e.target.value)} 
          required 
          className="w-full p-2 border rounded-lg bg-themeLightPink mb-6"
        />

        <button 
          type="submit" 
          className="w-full bg-themePink text-white p-3 rounded-lg hover:bg-themeDarkPink transition"
        >
          Zapisz pytanie
        </button>
      </form>

      <Notification message={notification} setMessage={setNotification} />
    </div>
  );
};

export default CreateQuestion;

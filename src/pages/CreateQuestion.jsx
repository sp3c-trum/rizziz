import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const CreateQuestion = () => {
  const { addQuestion } = useAuth();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!questionText || !correctAnswer || options.some(opt => !opt)) {
      alert("Uzupełnij wszystkie pola!");
      return;
    }

    await addQuestion(questionText, options, correctAnswer, timeLimit, category);

    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setTimeLimit(30);
    setCategory("");
  };

  return (
    <div class="p-2 bg-themeWhite h-screen">
      <h1 class="text-2xl">Stwórz pytanie!</h1>
      <form onSubmit={handleSubmit} class="p-1 text-lg">
        <label>Pytanie:</label>
        <input type="text" value={questionText} onChange={(e) => setQuestionText(e.target.value)} required 
        class="border rounded mx-2 bg-white p-1 text-base my-2"/>
        <br/>
        {options.map((option, index) => (
          <label key={index}>
            Opcja {index + 1}:
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
              required
              class="border rounded mx-2 bg-white p-1 text-base my-2"
            />
          </label>
        ))}
        <br/>
        <label>
          Poprawna odpowiedź:
          <select value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} required
            class="border rounded mx-2 bg-white p-1 text-base my-2">
            <option value="">Wybierz</option>
            {options.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </select>
        </label>
        <br/>
        <label>Limit czasowy:</label>
        <input type="number" value={timeLimit} onChange={(e) => setTimeLimit(e.target.value)} min="5" required 
          class="border rounded mx-2 bg-white p-1 text-base my-2"/>
        <br/>
        <label>Kategoria:</label>
        <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required 
        class="border rounded mx-2 bg-white p-1 text-base my-2"/>
        <br/>
        <button type="submit" class="bg-themeLightPink p-3 border-radius rounded my-1 hover:bg-themePink">Zapisz pytanie</button>
      </form>
    </div>
  );
};

export default CreateQuestion;

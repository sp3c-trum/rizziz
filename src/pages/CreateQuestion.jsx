import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Notification from "../components/Notification";

const CreateQuestion = () => {
  const { addQuestion, fetchCategories, addCategory } = useAuth();
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState([]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [timeLimit, setTimeLimit] = useState(30);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [newCategory, setNewCategory] = useState("");
  const [isOpenEnded, setIsOpenEnded] = useState(false);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const loadCategories = async () => {
      const fetchedCategories = await fetchCategories();
      setCategories(fetchedCategories);
    };
    loadCategories();
  }, []);
  
  const handleAddCategory = async () => {
    if (!newCategory) {
      setNotification("⚠️ Podaj nazwę kategorii!");
      return;
    }
    if (categories.includes(newCategory)) {
      setNotification("⚠️ Taka kategoria już istnieje!");
      return;
    }
  
    try {
      await addCategory(newCategory);
      const updatedCategories = await fetchCategories(); // Pobranie zaktualizowanej listy kategorii
      setCategories(updatedCategories);
      setCategory(newCategory);
      setNewCategory("");
      setNotification("✅ Kategoria dodana pomyślnie!");
    } catch (error) {
      console.error("Błąd dodawania kategorii:", error);
      setNotification("❌ Wystąpił błąd podczas dodawania kategorii!");
    }
  };

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

        <hr className="my-4 border-themePink" />

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
          </>
        )}
        <br />
        {!isOpenEnded && options.length > 0 && (
          <div className="mb-4">
            <label className="block text-lg font-medium text-themeDarkPink">Poprawna odpowiedź:</label>
            <select
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
              className="w-full p-2 border rounded-lg bg-themeLightPink"
            >
              <option value="">Wybierz poprawną odpowiedź</option>
              {options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        <hr className="my-4 border-themePink" />

        <label className="block text-lg font-medium text-themeDarkPink">Kategoria:</label>
        <select 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded-lg bg-themeLightPink mb-2"
        >
          <option value="">Wybierz kategorię</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>{cat}</option>
          ))}
        </select>
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Dodaj nową kategorię"
          className="w-full p-2 border rounded-lg bg-themeLightPink mb-2"
        />
        <button onClick={handleAddCategory} type="button" className="w-full bg-themePink text-white p-2 rounded-lg hover:bg-themeDarkPink">
          Dodaj kategorię
        </button>
        <hr className="my-4 border-themePink" />
        <button 
          type="submit" 
          className="w-full bg-themePink text-white p-3 rounded-lg hover:bg-themeDarkPink transition mt-4"
        >
          Zapisz pytanie
        </button>
      </form>

      <Notification message={notification} setMessage={setNotification} />
    </div>
  );
};

export default CreateQuestion;
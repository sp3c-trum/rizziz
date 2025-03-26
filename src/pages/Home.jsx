import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="bg-themeLightPink min-h-full flex flex-col items-center">
      <div className="w-full bg-themeWhite text-black py-12 text-center shadow-lg">
        <h1 className="text-6xl font-bold drop-shadow-lg">RIZZIZ</h1>
        <p className="text-xl mt-2">Twórz pytania i testuj swoją wiedzę!</p>
      </div>

      <div className="container mx-auto mt-10 p-6 bg-white rounded-xl shadow-md w-11/12 max-w-3xl text-center">
        <h2 className="text-4xl font-semibold text-themeDarkPink">Witaj w Rizziz!</h2>
        <p className="text-lg text-gray-600 mt-2">Zapisuj pytania i wykonuj quizy, aby sprawdzić swoją wiedzę!</p>
        <hr className="my-4 border-themePink" />

        <div className="mt-6 space-y-4">
          <Link to="/quiz">
            <button className="w-full my-2 text-white bg-themePink py-3 px-6 rounded-lg shadow-md text-lg font-semibold transition-all hover:bg-themeDarkPink hover:scale-105">
              Rozpocznij quiz z losowych pytań
            </button>
          </Link>

          <Link to="/create-question">
            <button className="w-full my-2 text-white bg-themePink py-3 px-6 rounded-lg shadow-md text-lg font-semibold transition-all hover:bg-themeDarkPink hover:scale-105">
              Stwórz pytanie
            </button>
          </Link>

          <Link to="/quiz-settings">
            <button className="w-full my-2 text-white bg-themePink py-3 px-6 rounded-lg shadow-md text-lg font-semibold transition-all hover:bg-themeDarkPink hover:scale-105">
              Wybierz opcje quizu
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

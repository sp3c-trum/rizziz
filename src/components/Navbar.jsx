import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-themeDarkPink text-white shadow-md">
      <Link to="/" className="text-4xl font-bold font-serif tracking-wide">
        Rizziz
      </Link>

      <ul className="flex space-x-6">
        <li className="">
          <Link
            to="/"
            className="px-4 py-2 rounded-lg bg-themeWhite text-black font-semibold transition duration-300 hover:bg-themePink hover:text-white"
          >
            Strona główna
          </Link>
        </li>
        <li>
          <Link
            to="/create-question"
            className="px-4 py-2 rounded-lg bg-themeWhite text-black font-semibold transition duration-300 hover:bg-themePink hover:text-white"
          >
            Stwórz pytanie
          </Link>
        </li>
        <li>
          <Link
            to="/quiz"
            className="px-4 py-2 rounded-lg bg-themeWhite text-black font-semibold transition duration-300 hover:bg-themePink hover:text-white"
          >
            Quiz
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;

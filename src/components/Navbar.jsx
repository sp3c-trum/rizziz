import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav class="flex items-center justify-between p-4 bg-themeDarkPink text-white h-20">
      <Link to="/"><h1 class=" text-5xl font-serif drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]">Rizziz</h1></Link>
      <ul>
        <li><Link to="/">Strona główna</Link></li>
        <hr />
        <li><Link to="/create-question">Stwórz pytanie</Link></li>
        <hr />
        <li><Link to="/quiz">Quiz</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
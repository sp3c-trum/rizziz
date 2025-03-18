import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div class="p-2 bg-themeLightPink h-screen">
      <h1 class="text-5xl">RIZZIZ - Prototyp (interfejs robiony bardzo na szybko)</h1>
      <p>Zapisuj pytania i wykonuj quizy!</p>
      <hr />
      <div class="my-4">
        <Link to="/quiz" >
          <button class="text-white bg-themePink p-3 border-radius rounded my-1 hover:bg-themeDarkPink">Rozpocznij quiz z losowych pytań</button>
        </Link>
        <br />
        <Link to="/create-question">
          <button class="text-white bg-themePink p-3 border-radius rounded my-1 hover:bg-themeDarkPink">Stwórz pytanie</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import Home from "./pages/Home";
import CreateQuestion from "./pages/CreateQuestion";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import Timer from "./components/Timer";
import QuizConfiguration from "./pages/QuizConfiguration";

function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create-question" element={<CreateQuestion />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/results" element={<Results />} />
            <Route path="/quiz-settings" element={<QuizConfiguration />} />
          </Routes>
        </Router>
      </AuthProvider>
    </Provider>
  );
}

export default App;
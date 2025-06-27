import { useState, useEffect } from "react";

// Import custom components
import StartScreen from "./components/StartScreen";
import QuestionScreen from "./components/QuestionScreen";
import ResultScreen from "./components/ResultScreen";
import questions from "./data/questions";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  // === State Management ===

  const [hasStarted, setHasStarted] = useState(false); // Tracks whether the quiz has started
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Index of the current question
  const [answers, setAnswers] = useState([]); // Stores user-selected answers
  const [elapsedTime, setElapsedTime] = useState(0); // Global timer for total quiz duration

  // === Global Timer (Stopwatch) ===

  useEffect(() => {
    let timer;

    if (hasStarted) {
      // Start counting elapsed time every second
      timer = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }

    // Clear timer on cleanup or when hasStarted becomes false
    return () => clearInterval(timer);
  }, [hasStarted]);

  // === Handlers ===

  // Called when the quiz starts
  const handleStart = () => {
    setHasStarted(true);          // Activate quiz
    setCurrentQuestionIndex(0);   // Reset question index
    setAnswers([]);               // Clear previous answers
    setElapsedTime(0);            // Reset timer
  };

  // Called when the quiz ends and user clicks restart
  const handleRestart = () => {
    setHasStarted(false);         // Show start screen again
    setCurrentQuestionIndex(0);   // Reset index
    setAnswers([]);               // Clear answers
    setElapsedTime(0);            // Reset timer
  };

  // Called after each question is answered (or time is up)
  const handleAnswer = (selectedOption) => {
    const updatedAnswers = [...answers, selectedOption]; // Add current answer to state
    setAnswers(updatedAnswers);

    const nextIndex = currentQuestionIndex + 1;

    // If there are more questions, move to next
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      // Quiz is over — allow a short delay before ending
      setTimeout(() => {
        setHasStarted(false); // This triggers result screen
      }, 0);
    }
  };

  // === UI Rendering Logic ===

  let content;

  if (!hasStarted) {
    // Not started: show either result screen or start screen
    content =
      answers.length === questions.length ? (
        <ResultScreen
          answers={answers}
          elapsedTime={elapsedTime}
          onRestart={handleRestart} // Pass restart function
        />
      ) : (
        <StartScreen onStart={handleStart} />
      );
  } else {
    // Quiz in progress: show the current question
    content = (
      <QuestionScreen
        question={questions[currentQuestionIndex]}
        onAnswer={handleAnswer}
        questionIndex={currentQuestionIndex}
        totalQuestions={questions.length}
        elapsedTime={elapsedTime}
      />
    );
  }

  // === Main App Layout ===

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <div style={{ flex: 1 }}>{content}</div> {/* Main content area */}
      <Footer />
    </div>
  );
}

export default App;
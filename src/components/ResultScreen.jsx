import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import questions from "../data/questions";

// ResultScreen component handles the summary view once the quiz is completed.
// It calculates the user's score and displays stats including correct, wrong, and unanswered questions.
const ResultScreen = ({ answers, onRestart, elapsedTime }) => {
  const { width, height } = useWindowSize(); // Fetch current window dimensions for Confetti

  // Initialize result counters
  let correct = 0;
  let incorrect = 0;
  let empty = 0;

  // Loop through user's answers and calculate result categories
  answers.forEach((answer, index) => {
    if (answer === null) {
      empty++;
    } else if (answer === questions[index].answer) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const successRate = Math.round((correct / questions.length) * 100); // Convert to percentage

  // Dynamically return message based on performance
  const getMessage = () => {
    if (successRate === 100) return "🎯 Mükemmel! Tümünü doğru yaptın!";
    if (successRate >= 80) return "👏 Harika iş çıkardın!";
    if (successRate >= 50) return "💪 Fena değil, daha iyisini yapabilirsin!";
    return "💡 Haydi tekrar dene, gelişmeye devam!";
  };

  // Local storage check for best score
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );

  // Update high score if current score is better
  useEffect(() => {
    if (successRate > highScore) {
      localStorage.setItem("highScore", successRate);
      setHighScore(successRate);
    }
  }, [successRate, highScore]);

  return (
    <div style={styles.container}>
      {/* Confetti animation for high-performing users */}
      {successRate >= 80 && <Confetti width={width} height={height} />}

      <motion.div
        style={styles.box}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>🎉 Test Tamamlandı!</h2>
        <h3 style={styles.message}>👏 {getMessage()}</h3>

        {/* Quiz summary details */}
        <p style={styles.text}>📊 Toplam Soru: {questions.length}</p>
        <p style={styles.text}>⏱️ Geçen Süre: {elapsedTime} saniye</p>
        <p style={styles.correct}>✅ Doğru: {correct}</p>
        <p style={styles.incorrect}>❌ Yanlış: {incorrect}</p>
        <p style={styles.empty}>⏳ Boş: {empty}</p>
        <p style={styles.text}>🎯 Başarı Oranı: {successRate}%</p>
        <p style={styles.text}>🏆 En Yüksek Başarı Oranı: {highScore}%</p>

        {/* Restart button */}
        <button
          style={styles.button}
          onClick={onRestart}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
        >
          Ana Sayfaya Dön
        </button>
      </motion.div>
    </div>
  );
};

// Inline styling for the result screen component
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(95vh - 100px)",
    width: "100vw",
    background: "linear-gradient(135deg, #e0e7ff, #f0f4ff)",
    padding: "20px",
    boxSizing: "border-box",
    position: "relative",
    overflow: "hidden",
  },
  box: {
    background: "rgba(255, 255, 255, 0.75)",
    border: "1px solid rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    padding: "40px",
    textAlign: "center",
    maxWidth: "700px",
    width: "100%",
    color: "#1f2937",
    zIndex: 1,
  },
  title: {
    fontSize: "26px",
    marginBottom: "12px",
    color: "#1f2937",
  },
  message: {
    fontSize: "20px",
    fontWeight: "500",
    marginBottom: "20px",
  },
  text: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#111827",
  },
  correct: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#16a34a",
    fontWeight: "600",
  },
  incorrect: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#dc2626",
    fontWeight: "600",
  },
  empty: {
    fontSize: "18px",
    marginBottom: "12px",
    color: "#ca8a04",
    fontWeight: "600",
  },
  button: {
    fontSize: "16px",
    padding: "10px 20px",
    marginTop: "20px",
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease",
  },
};

export default ResultScreen;
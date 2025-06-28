import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useWindowSize } from "react-use";
import questions from "../data/questions";

// ResultScreen component displays the final results after the quiz is completed
const ResultScreen = ({ answers, onRestart, elapsedTime }) => {
  const { width, height } = useWindowSize(); // For responsive confetti effect

  // Counters for correct, incorrect and empty answers
  let correct = 0;
  let incorrect = 0;
  let empty = 0;

  // Evaluate each answer
  answers.forEach((answer, index) => {
    if (answer === null) {
      empty++;
    } else if (answer === questions[index].answer) {
      correct++;
    } else {
      incorrect++;
    }
  });

  const successRate = Math.round((correct / questions.length) * 100); // Calculate success percentage

  // Personalized message based on performance
  const getMessage = () => {
    if (successRate === 100) return "🎯 Mükemmel! Tümünü doğru yaptın!";
    if (successRate >= 80) return "👏 Harika iş çıkardın!";
    if (successRate >= 50) return "💪 Fena değil, daha iyisini yapabilirsin!";
    return "💡 Haydi tekrar dene, gelişmeye devam!";
  };

  // Retrieve and update highest score from local storage
  const [highScore, setHighScore] = useState(
    parseInt(localStorage.getItem("highScore")) || 0
  );

  const [showAnswers, setShowAnswers] = useState(false); // Toggle visibility of answer summary

  useEffect(() => {
    if (successRate > highScore) {
      localStorage.setItem("highScore", successRate);
      setHighScore(successRate);
    }
  }, [successRate, highScore]);

  return (
    <div style={styles.container}>
      {/* Show confetti if score is high */}
      {successRate >= 80 && <Confetti width={width} height={height} />}

      <motion.div
        style={styles.box}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 style={styles.title}>🎉 Test Tamamlandı!</h2>
        <h3 style={styles.message}>👏 {getMessage()}</h3>

        {/* Basic statistics */}
        <p style={styles.text}>📊 Toplam Soru: {questions.length}</p>
        <p style={styles.text}>⏱️ Geçen Süre: {elapsedTime} saniye</p>
        <p style={styles.correct}>✅ Doğru: {correct}</p>
        <p style={styles.incorrect}>❌ Yanlış: {incorrect}</p>
        <p style={styles.empty}>⏳ Boş: {empty}</p>
        <p style={styles.text}>🎯 Başarı Oranı: {successRate}%</p>
        <p style={styles.text}>🏆 En Yüksek Başarı Oranı: {highScore}%</p>

        {/* Control buttons */}
        <div style={styles.buttonRow}>
          <button
            style={styles.button}
            onClick={() => setShowAnswers(!showAnswers)}
          >
            {showAnswers ? "Cevapları Gizle" : "Cevapları Göster"}
          </button>

          <button
            style={styles.button}
            onClick={onRestart}
            onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
            onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          >
            Ana Sayfaya Dön
          </button>
        </div>

        {/* Answer summary section */}
        {showAnswers && (
          <>
            <h3 style={{ ...styles.message, marginTop: 30 }}>
              📋 Cevapların Özeti:
            </h3>
            {questions.map((question, index) => {
              const userAnswer = answers[index];
              return (
                <div
                  key={index}
                  style={{ textAlign: "left", marginTop: 20 }}
                >
                  <p style={{ fontWeight: "600", fontSize: 16 }}>
                    {index + 1}. {question.question}
                  </p>
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "6px",
                    }}
                  >
                    {question.options.map((option, optIndex) => {
                      const isCorrect = option === question.answer;
                      const isUserAnswer = option === userAnswer;

                      let bgColor = "#e5e7eb";
                      let textColor = "#1f2937";

                      if (userAnswer === null) {
                        if (isCorrect) {
                          bgColor = "#4ade80";
                          textColor = "white";
                        }
                      } else {
                        if (isCorrect && isUserAnswer) {
                          bgColor = "#4ade80";
                          textColor = "white";
                        } else if (!isCorrect && isUserAnswer) {
                          bgColor = "#f87171";
                          textColor = "white";
                        } else if (isCorrect) {
                          bgColor = "#4ade80";
                          textColor = "white";
                        }
                      }

                      return (
                        <div
                          key={optIndex}
                          style={{
                            backgroundColor: bgColor,
                            color: textColor,
                            padding: "6px 12px",
                            borderRadius: "8px",
                            fontSize: "14px",
                            fontWeight: "500",
                          }}
                        >
                          {option}
                        </div>
                      );
                    })}

                    {/* Display empty warning if question is unanswered */}
                    {userAnswer === null && (
                      <div
                        style={{
                          backgroundColor: "#facc15",
                          color: "#111827",
                          padding: "6px 12px",
                          borderRadius: "8px",
                          fontSize: "14px",
                          fontWeight: "500",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span style={{ color: "#b91c1c", fontWeight: "700" }}>
                          ❓
                        </span>{" "}
                        Boş Bıraktın
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        )}
      </motion.div>
    </div>
  );
};

// Inline styles used for layout and theming
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
    cursor: "pointer",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "10px",
    transition: "all 0.3s ease",
  },
  buttonRow: {
    display: "flex",
    justifyContent: "center",
    gap: "15px",
    marginTop: "30px",
    flexWrap: "wrap",
  },
};

export default ResultScreen;
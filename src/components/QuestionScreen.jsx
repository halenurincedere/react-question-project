import React, { useEffect, useState } from "react";

// QuestionScreen component displays a single quiz question,
// including countdown timer, delayed answer options, and optional image.
const QuestionScreen = ({ question, onAnswer, questionIndex, totalQuestions }) => {
  const [showOptions, setShowOptions] = useState(false); // Control when to show answer options
  const [timeLeft, setTimeLeft] = useState(30); // Countdown timer per question

  useEffect(() => {
    setShowOptions(false);       // Reset options visibility
    setTimeLeft(30);             // Reset timer

    // Reveal answer options after 4 seconds
    const revealOptionsTimer = setTimeout(() => setShowOptions(true), 4000);

    // Countdown every second
    const countdown = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === 1) {
          clearInterval(countdown); // Stop countdown at 0
          onAnswer(null);           // Mark question as unanswered
        }
        return prev - 1;
      });
    }, 1000);

    // Cleanup timers when component unmounts or question changes
    return () => {
      clearTimeout(revealOptionsTimer);
      clearInterval(countdown);
    };
  }, [question]);

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        {/* Question progress indicator */}
        <h2 style={styles.header}>
          Soru {questionIndex + 1} / {totalQuestions}
        </h2>

        {/* Countdown timer display */}
        <p style={styles.timer}>⏳ Kalan Süre: {timeLeft} saniye</p>

        {/* Optional image section with blurred background effect */}
        {question.media && (
          <div style={styles.imageWrapper}>
            <img
              src={`/images/${question.media}`}
              alt="blur"
              style={styles.imageBlur}
              aria-hidden="true"
              draggable={false}
            />
            <img
              src={`/images/${question.media}`}
              alt="soru"
              style={styles.image}
              onContextMenu={(e) => e.preventDefault()} // Disable right-click
              draggable={false}                         // Prevent drag
            />
          </div>
        )}

        {/* Main question text */}
        <h3 style={styles.questionText}>{question.question}</h3>

        {/* Answer options or wait message */}
        {showOptions ? (
          <div style={styles.options}>
            {question.options.map((option, index) => (
              <button
                key={index}
                style={styles.optionButton}
                onClick={() => onAnswer(option)} // Send selected option to parent
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <p style={styles.waitMessage}>Şıklar birazdan görünecek...</p>
        )}
      </div>
    </div>
  );
};

// Styling definitions using inline CSS-in-JS approach
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(95vh - 100px)", // Account for top navbar height
    width: "100vw",
    background: "linear-gradient(135deg, #e0e7ff, #f0f4ff)", // Soft background gradient
    padding: "20px",
    boxSizing: "border-box",
  },
  box: {
    background: "rgba(255, 255, 255, 0.75)", // Glassmorphism style background
    border: "1px solid rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)", // Safari compatibility
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
    padding: "30px 20px",
    textAlign: "center",
    maxWidth: "640px",
    width: "100%",
    height: "68vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "-20px",
  },
  header: {
    fontSize: "18px",
    color: "#4f46e5",
    marginBottom: "4px",
  },
  timer: {
    fontSize: "14px",
    color: "#1e3a8a",
    fontWeight: "bold",
    marginBottom: "8px",
    lineHeight: "1.2",
  },
  imageWrapper: {
    position: "relative",
    width: "100%",
    maxWidth: "370px",
    paddingTop: "36.25%", // Maintain aspect ratio (16:9)
    overflow: "hidden",
    borderRadius: "12px",
    margin: "0 auto",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain", // Keep full image visible
    borderRadius: "12px",
    zIndex: 1,
  },
  imageBlur: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover", // Fill background area
    filter: "blur(12px)", // Visual background blur
    opacity: 0.6,
    zIndex: 0,
  },
  questionText: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#1f2937",
    marginBottom: "10px",
  },
  options: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  optionButton: {
    padding: "10px 16px",
    backgroundColor: "#4f46e5",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "14px",
    transition: "background-color 0.3s ease",
  },
  waitMessage: {
    fontStyle: "italic",
    color: "#6b7280",
    marginTop: "12px",
  },
};

export default QuestionScreen;
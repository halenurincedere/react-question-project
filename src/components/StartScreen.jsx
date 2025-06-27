import React from "react";

// StartScreen component renders the welcome screen before the quiz begins.
// It provides basic instructions and a call-to-action button to start the quiz.
const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen" style={styles.container}>
      <div style={styles.box}>
        {/* Welcome title */}
        <h1>Genel Kültür Testine Hoş Geldin 🎉</h1>

        {/* Test instructions for the user */}
        <p>Bu test toplam 10 sorudan oluşur.</p>
        <p>Her soru ekranda 30 saniye kalacak.</p>
        <p>İlk 4 saniye boyunca cevap şıkları gizli olacak.</p>
        <p>Hazırsan teste başlayabilirsin!</p>

        {/* Start button with hover effects */}
        <button
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#4338ca")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4f46e5")}
          onClick={onStart} // Trigger callback to begin the test
        >
          Teste Başla
        </button>
      </div>
    </div>
  );
};

// Inline style object for visual layout and responsiveness
const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "calc(95vh - 100px)", // Adjust height excluding navbar
    width: "100vw",
    background: "linear-gradient(135deg, #e0e7ff, #f0f4ff)", // Soft background gradient
    padding: "20px",
    boxSizing: "border-box",
  },
  box: {
    background: "rgba(255, 255, 255, 0.75)", // Semi-transparent white background
    border: "1px solid rgba(255, 255, 255, 0.4)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)", // Compatibility for Safari
    borderRadius: "20px",
    boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)", // Soft elevation effect
    padding: "50px 40px",
    textAlign: "center",
    maxWidth: "640px",
    width: "100%",
    color: "#1f2937", // Dark slate for better readability
  },
  button: {
    fontSize: "18px",
    padding: "12px 32px",
    marginTop: "30px",
    cursor: "pointer",
    backgroundColor: "#4f46e5", // Primary color
    color: "white",
    border: "none",
    borderRadius: "8px",
    transition: "all 0.3s ease", // Smooth hover transition
  },
};

export default StartScreen;
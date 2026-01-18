import React from "react";
import usePersistScreenshotBlackout from "./PreventScreenshot";

const styles = {
  body: {
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f4f6f8",
    minHeight: "100vh",
  },

  /* NAVBAR */
  navbar: {
    backgroundColor: "#0f172a",
    color: "#fff",
    padding: "14px 30px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: "18px",
    fontWeight: "bold",
  },
  navButton: {
    backgroundColor: "#25d366",
    border: "none",
    padding: "10px 16px",
    color: "#fff",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  /* LANDING */
  container: {
    maxWidth: "900px",
    margin: "40px auto",
    backgroundColor: "#fff",
    padding: "40px",
    borderRadius: "10px",
    textAlign: "center",
  },
  title: {
    fontSize: "32px",
    marginBottom: "10px",
  },
  subtitle: {
    color: "#555",
    marginBottom: "25px",
  },
  list: {
    listStyle: "none",
    padding: 0,
    marginBottom: "25px",
  },
  listItem: {
    margin: "10px 0",
    fontSize: "16px",
  },
  price: {
    fontSize: "20px",
    marginBottom: "25px",
  },
  mainButton: {
    backgroundColor: "#0ea5e9",
    border: "none",
    padding: "14px 24px",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "16px",
    fontWeight: "bold",
  },

  /* MCQ PREVIEW */
  mcqBox: {
    marginTop: "40px",
    textAlign: "left",
  },
  question: {
    marginBottom: "20px",
  },
  notice: {
    fontSize: "14px",
    color: "#777",
    marginTop: "20px",
  },

  /* WATERMARK */
  watermark: {
    position: "fixed",
    top: "40%",
    left: "50%",
    transform: "translate(-50%, -50%) rotate(-30deg)",
    fontSize: "22px",
    color: "rgba(0,0,0,0.08)",
    pointerEvents: "none",
    zIndex: 999,
    textAlign: "center",
  },
};

const LandingPage = () => {
  // Enable screenshot prevention
  usePersistScreenshotBlackout();

  return (
    <div style={styles.body}>

      {/* WATERMARK */}
      <div style={styles.watermark}>
        Accessed by: demo@student.com <br />
        13 Jan 2026 · Demo
      </div>

      {/* NAVBAR */}
      <nav style={styles.navbar}>
        <div style={styles.logo}>📘 MCQs Portal</div>
        <button style={styles.navButton}>
          WhatsApp Access
        </button>
      </nav>

      {/* LANDING CONTENT */}
      <div style={styles.container}>
        <h1 style={styles.title}>Secure MCQs for Exam Preparation</h1>
        <p style={styles.subtitle}>
          Read-only online MCQs. No PDFs. No downloads. Controlled access.
        </p>

        <ul style={styles.list}>
          <li style={styles.listItem}>✔ Important MCQs & Past Papers</li>
          <li style={styles.listItem}>✔ Login-based access</li>
          <li style={styles.listItem}>✔ Watermark on every page</li>
          <li style={styles.listItem}>✔ Single-device session</li>
        </ul>

        <div style={styles.price}>
          💰 Price: <strong>Rs. 1500 / Month</strong>
        </div>

        <button style={styles.mainButton}>
          Get Access on WhatsApp
        </button>

        {/* MCQ PREVIEW */}
        <div style={styles.mcqBox}>
          <h2>📖 MCQs Preview</h2>

          <div style={styles.question}>
            <strong>Q1.</strong> Which Surah is known as the heart of the Quran?
            <ul>
              <li>A) Al-Baqarah</li>
              <li>B) Yaseen</li>
              <li>C) Al-Kahf</li>
              <li>D) Ar-Rahman</li>
            </ul>
          </div>

          <div style={styles.question}>
            <strong>Q2.</strong> How many Makki Surahs are there?
            <ul>
              <li>A) 82</li>
              <li>B) 86</li>
              <li>C) 88</li>
              <li>D) 90</li>
            </ul>
          </div>

          <p style={styles.notice}>
            🔒 Content is read-only. Copying, printing, and misuse are discouraged.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

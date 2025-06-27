import React from "react";

/**
 * Footer Component
 * Renders the application footer with branding and author information.
 * Uses inline styles for simplicity since layout is minimal and not reused.
 */
const Footer = () => {
  return (
    <footer style={styles.footer}>
      {/* Primary copyright text */}
      <p style={styles.text}>
        © 2025 <strong>Lumi Design</strong> — All Rights Reserved.
      </p>

      {/* Developer attribution with external GitHub link */}
      <p style={styles.signature}>
        Design & Development by{" "}
        <a
          href="https://github.com/halenurincedere"
          target="_blank"
          rel="noopener noreferrer"
          style={styles.link}
        >
          @halenurincedere
        </a>
      </p>
    </footer>
  );
};

// Inline style definitions for the Footer component
const styles = {
  footer: {
    backgroundColor: "#e0e7ff",          // Light blue background consistent with theme
    textAlign: "center",                 // Center-aligns all footer content
    padding: "10px",                     // Adds vertical spacing
    marginTop: "auto",                   // Pushes footer to bottom in flex layouts
    borderTop: "1px solid #e5e7eb",      // Light border to visually separate from content
  },
  text: {
    color: "#6b7280",                    // Neutral gray text color
    fontSize: "14px",                    // Standard footer text size
    margin: "4px 0",                     // Vertical spacing for readability
  },
  signature: {
    fontSize: "14px",                    // Matches copyright size
    color: "#4b5563",                    // Slightly darker for emphasis
    marginTop: "2px",                    // Subtle spacing from above line
  },
  link: {
    color: "#4f46e5",                    // Accent color for links
    textDecoration: "none",              // Removes default underline
    fontWeight: "600",                   // Highlights author name
    transition: "color 0.3s",            // Enables smooth hover effect (via browser default)
  },
};

export default Footer;
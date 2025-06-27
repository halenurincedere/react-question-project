import React from "react";

/**
 * Navbar Component
 * Fixed top navigation bar with brand/logo text.
 * Uses inline styles for quick configuration (not ideal for large-scale apps).
 */
const Navbar = () => {
  return (
    <header style={styles.nav}>
      {/* Brand title/logo text aligned to the left */}
      <div style={styles.logo}>LUMI</div>
    </header>
  );
};

// Inline styles used for layout and appearance
const styles = {
  nav: {
    width: "100%",                                        // Full width navbar
    height: "60px",                                       // Fixed height
    background: "linear-gradient(to right, #e0e7ff, #f0f4ff)", // Soft blue gradient
    display: "flex",                                      // Horizontal layout
    alignItems: "center",                                 // Vertically center content
    padding: "0 0px",                                     // No horizontal padding; we use margin in child
    boxShadow: "0 2px 8px rgba(0,0,0,0.05)",              // Subtle shadow to elevate nav
    position: "sticky",                                   // Sticks to top on scroll
    top: 0,
    zIndex: 1000,                                         // Keeps navbar above all other content
  },
  logo: {
    fontSize: "22px",                                     // Logo font size
    fontWeight: "800",                                    // Extra bold for brand visibility
    color: "#4f46e5",                                     // Indigo-blue brand color
    letterSpacing: "1px",                                 // Slight spacing for clarity
    marginLeft: "24px",                                   // Left margin to offset from edge
  },
};

export default Navbar;
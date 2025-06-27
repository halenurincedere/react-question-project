// Import React StrictMode for highlighting potential problems during development
import { StrictMode } from 'react'

// Import createRoot API from ReactDOM for concurrent rendering
import { createRoot } from 'react-dom/client'

// Import global styles
import './index.css'

// Import the main App component
import App from './App.jsx'

// Create and mount the React app inside the root DOM element
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App /> {/* Main application component */}
  </StrictMode>
)
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Loads Tailwind
import './index.css'
// Main React compononent
import App from './App.jsx'

// Find the <div id="root"> in index.html
// and put your React app inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* This renders da App component */}
    {/* soz im writing dis so i understand */}
    <App />
  </StrictMode>,
)

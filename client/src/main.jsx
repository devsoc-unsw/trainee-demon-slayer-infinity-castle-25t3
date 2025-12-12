import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Loads Tailwind
import './index.css'
// Main React compononent
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

// Find the <div id="root"> in index.html
// and put your React app inside it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/*Wrap in auth context, so that any part of app can access auth context (App can call useAuth which calls useContext and returns the context*/}
    <AuthProvider>
      {/* This renders da App component */}
      {/* soz im writing dis so i understand */}
      <App />
    </AuthProvider>
  </StrictMode>,
)

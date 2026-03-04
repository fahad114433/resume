import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/authContext.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="730605737959-ib42m3kug32o3nk1kcbk9bdqdsgii77l.apps.googleusercontent.com">
  <AuthProvider>
    <App />
    </AuthProvider>
    </GoogleOAuthProvider>
  
)

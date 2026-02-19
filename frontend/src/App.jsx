import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";
import { AuthContext } from "./context/authContext.jsx"; 
import ResumePreview from "./pages/ResumePreview.jsx";
import { useContext } from "react";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function App() {
  return (
    
    <Router>
          
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/builder" element={<ProtectedRoute><ResumeBuilder /></ProtectedRoute>} />
        <Route path="/preview/:id" element={<ProtectedRoute><ResumePreview /></ProtectedRoute>} />

      </Routes>
      
    </Router>
   
  );
}

export default App;


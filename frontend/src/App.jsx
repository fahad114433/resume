import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import { AuthContext } from "./context/authContext.jsx";
import ResumePreview from "./pages/dashboard/ResumePreview.jsx";
import { useContext } from "react";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Templates from "./pages/Templates.jsx";
import Contact from "./pages/Contact.jsx";
import Footer from "./components/Footer.jsx";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardHome from "./pages/dashboard/DashboardHome";
import CreateResume from "./pages/dashboard/CreateResume";
import ResumeView from "./pages/dashboard/ResumeView.jsx";
import TemplateSelector from "./pages/dashboard/TemplateSelector.jsx";


// import UpdateResume from "./pages/dashboard/UpdateResume";
// import CoverLetter from "./pages/dashboard/CoverLetter";
// import Settings from "./pages/dashboard/Settings";

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};

function Layout() {
  const location = useLocation();

  // Hide navbar for login/register/builder and ALL dashboard routes
  const hideNavbar =
    location.pathname.startsWith("/dashboard") ||
    //location.pathname.startsWith("/preview") ||
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/builder";
   

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        
        
          <Route path="preview/:id" element={ <ResumePreview />} />
        

        {/* Dashboard Nested Routes */}
        <Route path="/dashboard/*" element={<ProtectedRoute> <DashboardLayout /> </ProtectedRoute>} >
          <Route index element={<DashboardHome />} />
          <Route path="create" element={<CreateResume />} />
          <Route path="resume" element={<ResumeView />} />
          <Route path="preview/:id" element={ <ResumePreview />} />
           <Route path="templates" element={<TemplateSelector />} />
         
          {/* <Route path="update" element={<UpdateResume />} />
          <Route path="cover-letter" element={<CoverLetter />} />
          <Route path="settings" element={<Settings />} />  */}
        </Route>

      </Routes>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
      <Footer />

    </Router>
  );
}

export default App;
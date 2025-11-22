import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AIDashboard from "./pages/AIDashboard.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/homeUi" element={<HomePage />} />
        <Route path="/ai-assistant" element={<AIDashboard />} />
        <Route path="/interview" element={<InterviewPage />} />
      </Routes>
    </Router>
  );
}


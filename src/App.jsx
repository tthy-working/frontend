// simple 3 words
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import SignUpPage from "./pages/SignUpPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import AIDashboard from "./pages/AIDashboard.jsx";
import InterviewPage from "./pages/InterviewPage.jsx";
import LogInPage from "./pages/LogInPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import FavoritesPage from "./pages/FavoritesPage.jsx";
import EmailTemplatesPage from './pages/EmailTemplatesPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route path="/LogIn" element={<LogInPage />} />
        <Route path="/homeUi" element={<HomePage />} />
        <Route path="/ai-assistant" element={<AIDashboard />} />
        <Route path="/interview" element={<InterviewPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/email-templates" element={<EmailTemplatesPage />} />
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

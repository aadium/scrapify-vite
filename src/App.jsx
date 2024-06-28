import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import Landing from "./pages/landing";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScraperDetails from "./pages/scraper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/scraper/:id" element={<ScraperDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
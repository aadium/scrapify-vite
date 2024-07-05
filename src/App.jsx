import SignInPage from "./pages/auth/signin";
import SignUpPage from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import Landing from "./pages/landing";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import ScraperDetailsOut from "./pages/scraper/scraper";
import Output from "./pages/scraper/output";
import AddScraper from "./pages/addScraper";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/add" element={<AddScraper />} />
        <Route path="/scraper/:id" element={<ScraperDetailsOut />} />
        <Route path="/scraper/output/:id" element={<Output />} />
      </Routes>
    </Router>
  );
}

export default App;
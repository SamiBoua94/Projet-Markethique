import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage';
import ClientHomePage from './pages/ClientHomePage.jsx';
import MerchantHomePage from './pages/MerchantHomePage.jsx';
import EditAccountPage from './pages/EditAccountPage.jsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/client" element={<ClientHomePage />} />
          <Route path="/merchant" element={<MerchantHomePage />} />
          <Route path="/edit-account" element={<EditAccountPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

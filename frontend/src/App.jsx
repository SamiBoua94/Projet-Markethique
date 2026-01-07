import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import HomePage from './pages/HomePage.jsx';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ClientHomePage from './pages/ClientHomePage.jsx';
import MerchantHomePage from './pages/MerchantHomePage.jsx';
import EditAccountPage from './pages/EditAccountPage.jsx';
import MerchantProductPage from './pages/MerchantProductPage.jsx';
import ProfilePage from './pages/ProfilePage';
import SellerDashboard from './pages/SellerDashboard';
import ProtectedRoute from './components/auth/ProtectedRoute';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Toaster position="top-right" />
        <Routes>
          {/* Routes publiques */}
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          
          {/* Routes protégées - Client */}
          <Route element={<ProtectedRoute requiredRole="buyer" />}>
            <Route path="/client" element={<ClientHomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          
          {/* Routes protégées - Vendeur */}
          <Route element={<ProtectedRoute requiredRole="seller" />}>
            <Route path="/seller" element={<MerchantHomePage />} />
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/products" element={<MerchantProductPage />} />
          </Route>
          
          {/* Route de déconnexion */}
          <Route path="/logout" element={<Navigate to="/" replace />} />
          
          {/* Route 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

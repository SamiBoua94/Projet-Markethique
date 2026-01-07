import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductPage from './pages/ProductPage';
import BuyerDashboard from './pages/buyer/BuyerDashboard';
import SellerDashboard from './pages/seller/SellerDashboard';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import { logout } from './store/authSlice';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [search, setSearch] = useState('');

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="app-root">
      <header className="app-header">
        <div className="app-header-inner">
          <div className="header-left">
            <Link to="/" className="logo">
              AMAZONE
            </Link>
          </div>
          <div className="header-center">
            <form
              className="header-search"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                className="header-search-input"
                type="text"
                placeholder="Rechercher des produits..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="header-search-button" type="submit">
                Rechercher
              </button>
            </form>
          </div>
          <div className="header-right">
            <nav className="main-nav">
              {!user && <Link to="/login">Connexion</Link>}
              {!user && <Link to="/register">Inscription</Link>}
              {user && user.role === 'buyer' && <Link to="/buyer">Mes commandes</Link>}
              {user && user.role === 'seller' && <Link to="/seller">Espace vendeur</Link>}
              {user && user.role === 'admin' && <Link to="/admin">Admin</Link>}
            </nav>
            {user && (
              <div className="user-info">
                <span>
                  Bonjour, {user.name} ({user.role})
                </span>
                <button type="button" onClick={handleLogout}>
                  Déconnexion
                </button>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="app-main">
        <Routes>
          <Route path="/" element={<HomePage search={search} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/products/:id" element={<ProductPage />} />

          <Route element={<ProtectedRoute allowedRoles={['buyer']} />}>
            <Route path="/buyer" element={<BuyerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['seller']} />}>
            <Route path="/seller" element={<SellerDashboard />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin" element={<AdminDashboard />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
}

export default App;

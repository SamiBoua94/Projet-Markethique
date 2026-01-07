import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../../services/authService';
import './AuthForm.css';

const Login = ({ onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'buyer' // 'buyer' ou 'seller'
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({
        email: formData.email,
        password: formData.password,
        userType: formData.userType
      });
      
      if (onLoginSuccess) {
        onLoginSuccess();
      }
      
      // Rediriger vers la page d'accueil après connexion réussie
      navigate('/');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de la connexion');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Connexion</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Entrez votre email"
            />
          </div>
          
          <div className="form-group">
            <label>Mot de passe</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Entrez votre mot de passe"
            />
          </div>
          
          <div className="form-group">
            <label>Je me connecte en tant que :</label>
            <div className="user-type-selector">
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="buyer"
                  checked={formData.userType === 'buyer'}
                  onChange={handleChange}
                />
                <span>Acheteur</span>
              </label>
              <label className="radio-label">
                <input
                  type="radio"
                  name="userType"
                  value="seller"
                  checked={formData.userType === 'seller'}
                  onChange={handleChange}
                />
                <span>Vendeur</span>
              </label>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="btn btn-primary btn-block"
            disabled={isLoading}
          >
            {isLoading ? 'Connexion en cours...' : 'Se connecter'}
          </button>
          
          <div className="auth-footer">
            <p>Pas encore de compte ? <Link to="/register">S'inscrire</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

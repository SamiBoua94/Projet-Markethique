import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../../services/authService';
import './AuthForm.css';

const Register = ({ onRegisterSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'buyer', // 'buyer' ou 'seller'
    address: '',
    phone: ''
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
    
    // Validation des mots de passe
    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }
    
    setIsLoading(true);

    try {
      // Préparer les données pour correspondre au format attendu par le backend
      const { confirmPassword, username, userType, ...rest } = formData;
      const userData = {
        name: username, // Le backend attend 'name' au lieu de 'username'
        role: userType, // Le backend attend 'role' au lieu de 'userType'
        ...rest
      };
      
      await register(userData);
      
      if (onRegisterSuccess) {
        onRegisterSuccess();
      }
      
      // Rediriger vers la page de connexion après inscription réussie
      navigate('/login');
    } catch (err) {
      setError(err.message || 'Une erreur est survenue lors de l\'inscription');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h2>Créer un compte</h2>
        {error && <div className="alert alert-danger">{error}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nom d'utilisateur</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-control"
              placeholder="Choisissez un nom d'utilisateur"
            />
          </div>
          
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
              minLength="6"
              className="form-control"
              placeholder="Créez un mot de passe"
            />
          </div>
          
          <div className="form-group">
            <label>Confirmer le mot de passe</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              minLength="6"
              className="form-control"
              placeholder="Confirmez votre mot de passe"
            />
          </div>
          
          <div className="form-group">
            <label>Téléphone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="form-control"
              placeholder="Votre numéro de téléphone"
            />
          </div>
          
          <div className="form-group">
            <label>Adresse</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="form-control"
              placeholder="Votre adresse"
            />
          </div>
          
          <div className="form-group">
            <label>Je m'inscris en tant que :</label>
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
            {isLoading ? 'Inscription en cours...' : 'Créer mon compte'}
          </button>
          
          <div className="auth-footer">
            <p>Déjà inscrit ? <Link to="/login">Se connecter</Link></p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;

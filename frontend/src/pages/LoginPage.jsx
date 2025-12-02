import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    try {
      // Simulation de connexion
      await new Promise(resolve => setTimeout(resolve, 500));
      navigate('/');
    } catch (err) {
      setError('Identifiant ou mot de passe incorrect.');
      console.error('Erreur de connexion:', err);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-box">
          <div className="login-header">
            <h1>Connexion à Markethique</h1>
            <p className="welcome-text">Entrez vos identifiants pour accéder à votre espace</p>
          </div>
          
          {error && (
            <div className="flash flash-error">
              <svg className="octicon octicon-alert" viewBox="0 0 16 16" width="16" height="16">
                <path fillRule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path>
              </svg>
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="username">Username or email address</label>
              <input
                className="form-control"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoFocus
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="forgot-password-container">
                <a href="/password_reset" className="forgot-password">Forgot password?</a>
              </div>
            </div>
            
            <button type="submit" className="btn btn-primary btn-block">
              Sign in
            </button>
          </form>
          
          <div className="login-footer">
            <p className="create-account-callout">
              New to Markethique? <a href="/signup">Create an account</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

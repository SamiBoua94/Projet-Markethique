import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import './ProfilePage.css';

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
      navigate('/login');
      return;
    }
    
    setUser(currentUser);
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return <div>Chargement du profil...</div>;
  }

  return (
    <div className="profile-container">
      <h1>Mon Profil</h1>
      <div className="profile-info">
        <div className="profile-avatar">
          <span>{user?.username?.charAt(0).toUpperCase()}</span>
        </div>
        <div className="profile-details">
          <h2>{user?.username}</h2>
          <p><strong>Email :</strong> {user?.email}</p>
          <p><strong>Type de compte :</strong> {user?.userType === 'buyer' ? 'Acheteur' : 'Vendeur'}</p>
          {user?.address && <p><strong>Adresse :</strong> {user.address}</p>}
          {user?.phone && <p><strong>Téléphone :</strong> {user.phone}</p>}
        </div>
      </div>
      
      <div className="profile-actions">
        <button 
          className="btn btn-primary"
          onClick={() => navigate('/edit-account')}
        >
          Modifier mes informations
        </button>
      </div>
    </div>
  );
};

export default ProfilePage;

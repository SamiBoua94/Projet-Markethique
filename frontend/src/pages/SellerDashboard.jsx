import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCurrentUser } from '../services/authService';
import './SellerDashboard.css';

const SellerDashboard = () => {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = getCurrentUser();

  useEffect(() => {
    // Simuler le chargement des données
    const fetchDashboardData = async () => {
      try {
        // Ici, vous feriez normalement un appel API pour récupérer les données du tableau de bord
        // Pour l'instant, nous allons simuler des données
        setTimeout(() => {
          setStats({
            totalProducts: 24,
            totalOrders: 156,
            totalRevenue: 12500,
            pendingOrders: 8
          });
          
          setRecentOrders([
            { id: 1, customer: 'Jean Dupont', amount: 125, status: 'En cours' },
            { id: 2, customer: 'Marie Martin', amount: 89, status: 'Expédiée' },
            { id: 3, customer: 'Pierre Durand', amount: 156, status: 'En attente' },
            { id: 4, customer: 'Sophie Bernard', amount: 67, status: 'Expédiée' },
            { id: 5, customer: 'Lucie Petit', amount: 198, status: 'En cours' },
          ]);
          
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error('Erreur lors du chargement du tableau de bord:', error);
        setLoading(false);
      }
    };
    
    fetchDashboardData();
  }, []);

  if (loading) {
    return <div>Chargement du tableau de bord...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h1>Tableau de bord vendeur</h1>
        <p>Bienvenue, {user?.username || 'Vendeur'}</p>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Produits</h3>
          <p className="stat-number">{stats.totalProducts}</p>
          <Link to="/seller/products" className="stat-link">Voir les produits →</Link>
        </div>
        
        <div className="stat-card">
          <h3>Commandes totales</h3>
          <p className="stat-number">{stats.totalOrders}</p>
        </div>
        
        <div className="stat-card">
          <h3>Chiffre d'affaires</h3>
          <p className="stat-number">{stats.totalRevenue.toLocaleString()} €</p>
        </div>
        
        <div className="stat-card">
          <h3>Commandes en attente</h3>
          <p className="stat-number">{stats.pendingOrders}</p>
        </div>
      </div>
      
      <div className="recent-orders">
        <div className="section-header">
          <h2>Commandes récentes</h2>
          <Link to="/seller/orders" className="view-all">Voir tout</Link>
        </div>
        
        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>N° Commande</th>
                <th>Client</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.amount} €</td>
                  <td>
                    <span className={`status-badge ${order.status.toLowerCase().replace(' ', '-')}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn-small">Détails</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="quick-actions">
        <h2>Actions rapides</h2>
        <div className="action-buttons">
          <Link to="/seller/products/new" className="btn btn-primary">
            Ajouter un produit
          </Link>
          <Link to="/seller/orders" className="btn btn-secondary">
            Voir les commandes
          </Link>
          <Link to="/seller/products" className="btn btn-secondary">
            Gérer les produits
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;

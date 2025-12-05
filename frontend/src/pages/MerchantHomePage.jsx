import { useState } from 'react';
import './MerchantHomePage.css';

const MerchantHomePage = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showWalletMenu, setShowWalletMenu] = useState(false);
    const [showShopMenu, setShowShopMenu] = useState(false);

    // Mock merchant data
    const merchant = {
        shopName: 'Tech Innovation',
        ownerName: 'Jean Martin',
        avatar: '💻',
        memberSince: '2022',
        rating: 4.9,
        totalSales: 45230.50
    };

    const stats = {
        pendingOrders: 12,
        monthlyRevenue: 8450.00,
        totalProducts: 180,
        newMessages: 5
    };

    const recentTransactions = [
        { id: 'TRX-001', date: '2024-12-05', amount: 149.99, type: 'Vente', status: 'Confirmé' },
        { id: 'TRX-002', date: '2024-12-04', amount: 89.99, type: 'Vente', status: 'Confirmé' },
        { id: 'TRX-003', date: '2024-12-03', amount: -29.99, type: 'Remboursement', status: 'Traité' },
        { id: 'TRX-004', date: '2024-12-02', amount: 199.99, type: 'Vente', status: 'Confirmé' }
    ];

    const pendingOrders = [
        { id: 'CMD-105', customer: 'Marie D.', items: 2, total: 149.99, date: '2024-12-05 10:30' },
        { id: 'CMD-104', customer: 'Pierre L.', items: 1, total: 89.99, date: '2024-12-05 09:15' },
        { id: 'CMD-103', customer: 'Sophie M.', items: 3, total: 254.97, date: '2024-12-04 18:45' }
    ];

    const deliveries = [
        { id: 'LIV-045', order: 'CMD-098', destination: 'Paris', status: 'En transit', eta: '2024-12-06' },
        { id: 'LIV-044', order: 'CMD-097', destination: 'Lyon', status: 'En préparation', eta: '2024-12-07' },
        { id: 'LIV-043', order: 'CMD-096', destination: 'Marseille', status: 'Livré', eta: '2024-12-05' }
    ];

    const messages = [
        { id: 1, from: 'Marie Dupont', subject: 'Question sur le produit', unread: true, time: '11:30' },
        { id: 2, from: 'Pierre Lambert', subject: 'Demande de retour', unread: true, time: '10:15' },
        { id: 3, from: 'Support Markethique', subject: 'Mise à jour important', unread: false, time: 'Hier' }
    ];

    const topProducts = [
        { id: 1, name: 'Casque Audio Premium', sales: 45, revenue: 6749.55, stock: 23, image: '🎧' },
        { id: 2, name: 'Souris Gaming', sales: 38, revenue: 2659.62, stock: 15, image: '🖱️' },
        { id: 3, name: 'Clavier Mécanique', sales: 32, revenue: 4479.68, stock: 8, image: '⌨️' },
        { id: 4, name: 'Webcam HD', sales: 28, revenue: 3919.72, stock: 19, image: '📹' }
    ];

    const unreadMessages = messages.filter(m => m.unread).length;

    return (
        <div className="merchant-homepage">
            {/* Header */}
            <header className="merchant-header">
                <div className="header-container">
                    {/* Logo */}
                    <div className="logo-section">
                        <div className="logo">🌍</div>
                        <h1 className="site-title">Markethique</h1>
                        <span className="merchant-badge">Vendeur</span>
                    </div>

                    {/* Quick Stats */}
                    <div className="quick-stats">
                        <div className="stat-item">
                            <span className="stat-label">Commandes en attente</span>
                            <span className="stat-value">{stats.pendingOrders}</span>
                        </div>
                        <div className="stat-item">
                            <span className="stat-label">Revenus du mois</span>
                            <span className="stat-value">{stats.monthlyRevenue.toFixed(2)}€</span>
                        </div>
                    </div>

                    {/* Header Actions */}
                    <div className="header-actions">
                        {/* Help/Settings */}
                        <button className="icon-button" title="Aide & Paramètres">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
                            </svg>
                        </button>

                        {/* Messages */}
                        <button className="icon-button" title="Messages">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
                        </button>

                        {/* Wallet */}
                        <div className="wallet-dropdown">
                            <button
                                className="icon-button wallet-button"
                                onMouseEnter={() => setShowWalletMenu(true)}
                                onMouseLeave={() => setShowWalletMenu(false)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
                                    <line x1="1" y1="10" x2="23" y2="10" />
                                </svg>
                            </button>

                            {showWalletMenu && (
                                <div
                                    className="wallet-menu"
                                    onMouseEnter={() => setShowWalletMenu(true)}
                                    onMouseLeave={() => setShowWalletMenu(false)}
                                >
                                    <div className="wallet-header">
                                        <h3>Portefeuille</h3>
                                        <span className="wallet-balance">{merchant.totalSales.toFixed(2)}€</span>
                                    </div>
                                    <div className="wallet-actions">
                                        <button className="wallet-action-btn">Mes transactions</button>
                                        <button className="wallet-action-btn">Historique commandes</button>
                                        <button className="wallet-action-btn">Livraisons</button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* My Shop */}
                        <div className="shop-dropdown">
                            <button
                                className="icon-button shop-button"
                                onMouseEnter={() => setShowShopMenu(true)}
                                onMouseLeave={() => setShowShopMenu(false)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                    <polyline points="9 22 9 12 15 12 15 22" />
                                </svg>
                            </button>

                            {showShopMenu && (
                                <div
                                    className="shop-menu"
                                    onMouseEnter={() => setShowShopMenu(true)}
                                    onMouseLeave={() => setShowShopMenu(false)}
                                >
                                    <div className="shop-menu-header">
                                        <h3>Ma Boutique</h3>
                                    </div>
                                    <div className="shop-actions">
                                        <button className="shop-action-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <circle cx="12" cy="12" r="10" />
                                                <line x1="12" y1="8" x2="12" y2="16" />
                                                <line x1="8" y1="12" x2="16" y2="12" />
                                            </svg>
                                            Service + / Abonnements
                                        </button>
                                        <button className="shop-action-btn">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                            </svg>
                                            Gérer ma boutique
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* User Profile */}
                        <div className="user-dropdown">
                            <button
                                className="user-button"
                                onMouseEnter={() => setShowUserMenu(true)}
                                onMouseLeave={() => setShowUserMenu(false)}
                            >
                                <div className="user-avatar">{merchant.avatar}</div>
                                <div className="user-info">
                                    <span className="user-name">{merchant.shopName}</span>
                                    <span className="user-rating">⭐ {merchant.rating}</span>
                                </div>
                                <svg className="chevron" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7 10l5 5 5-5z" />
                                </svg>
                            </button>

                            {showUserMenu && (
                                <div
                                    className="user-menu"
                                    onMouseEnter={() => setShowUserMenu(true)}
                                    onMouseLeave={() => setShowUserMenu(false)}
                                >
                                    <div className="user-menu-header">
                                        <div className="user-avatar-large">{merchant.avatar}</div>
                                        <div>
                                            <p className="user-menu-name">{merchant.shopName}</p>
                                            <p className="user-menu-owner">{merchant.ownerName}</p>
                                        </div>
                                    </div>
                                    <div className="user-menu-divider"></div>
                                    <button className="user-menu-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                        </svg>
                                        Modifier mon compte
                                    </button>
                                    <button className="user-menu-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                            <polyline points="16 17 21 12 16 7" />
                                            <line x1="21" y1="12" x2="9" y2="12" />
                                        </svg>
                                        Déconnexion
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="merchant-main">
                {/* Welcome Section */}
                <section className="welcome-section">
                    <div className="container">
                        <h2 className="welcome-title">Tableau de bord - {merchant.shopName} 📊</h2>
                        <p className="welcome-subtitle">Gérez votre boutique et suivez vos performances</p>
                    </div>
                </section>

                {/* Dashboard Stats */}
                <section className="dashboard-section">
                    <div className="container">
                        <div className="dashboard-grid">
                            <div className="dashboard-card revenue">
                                <div className="dashboard-icon">💰</div>
                                <div className="dashboard-content">
                                    <p className="dashboard-label">Revenus du mois</p>
                                    <p className="dashboard-value">{stats.monthlyRevenue.toFixed(2)}€</p>
                                    <p className="dashboard-change positive">+12.5% vs mois dernier</p>
                                </div>
                            </div>
                            <div className="dashboard-card orders">
                                <div className="dashboard-icon">📦</div>
                                <div className="dashboard-content">
                                    <p className="dashboard-label">Commandes en attente</p>
                                    <p className="dashboard-value">{stats.pendingOrders}</p>
                                    <p className="dashboard-change">À traiter</p>
                                </div>
                            </div>
                            <div className="dashboard-card products">
                                <div className="dashboard-icon">🛍️</div>
                                <div className="dashboard-content">
                                    <p className="dashboard-label">Produits actifs</p>
                                    <p className="dashboard-value">{stats.totalProducts}</p>
                                    <p className="dashboard-change">En ligne</p>
                                </div>
                            </div>
                            <div className="dashboard-card messages">
                                <div className="dashboard-icon">💬</div>
                                <div className="dashboard-content">
                                    <p className="dashboard-label">Nouveaux messages</p>
                                    <p className="dashboard-value">{stats.newMessages}</p>
                                    <p className="dashboard-change attention">À répondre</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Pending Orders */}
                <section className="pending-orders-section">
                    <div className="container">
                        <h2 className="section-title">Commandes en attente</h2>
                        <div className="orders-list">
                            {pendingOrders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-info">
                                        <div className="order-main">
                                            <p className="order-id">#{order.id}</p>
                                            <p className="order-customer">Client: {order.customer}</p>
                                            <p className="order-time">{order.date}</p>
                                        </div>
                                        <div className="order-details">
                                            <p className="order-items">{order.items} article{order.items > 1 ? 's' : ''}</p>
                                            <p className="order-total">{order.total.toFixed(2)}€</p>
                                        </div>
                                    </div>
                                    <div className="order-actions">
                                        <button className="order-btn accept">Accepter</button>
                                        <button className="order-btn view">Détails</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Two Column Layout */}
                <div className="container">
                    <div className="two-column-layout">
                        {/* Recent Transactions */}
                        <section className="transactions-section">
                            <h2 className="section-title">Transactions récentes</h2>
                            <div className="transactions-list">
                                {recentTransactions.map(transaction => (
                                    <div key={transaction.id} className="transaction-card">
                                        <div className="transaction-info">
                                            <p className="transaction-id">{transaction.id}</p>
                                            <p className="transaction-date">{transaction.date}</p>
                                            <p className="transaction-type">{transaction.type}</p>
                                        </div>
                                        <div className="transaction-amount-section">
                                            <p className={`transaction-amount ${transaction.amount > 0 ? 'positive' : 'negative'}`}>
                                                {transaction.amount > 0 ? '+' : ''}{transaction.amount.toFixed(2)}€
                                            </p>
                                            <span className={`transaction-status ${transaction.status.toLowerCase()}`}>
                                                {transaction.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </section>

                        {/* Deliveries */}
                        <section className="deliveries-section">
                            <h2 className="section-title">Livraisons en cours</h2>
                            <div className="deliveries-list">
                                {deliveries.map(delivery => (
                                    <div key={delivery.id} className="delivery-card">
                                        <div className="delivery-icon">🚚</div>
                                        <div className="delivery-info">
                                            <p className="delivery-id">{delivery.id}</p>
                                            <p className="delivery-order">Commande: {delivery.order}</p>
                                            <p className="delivery-destination">→ {delivery.destination}</p>
                                            <p className="delivery-eta">ETA: {delivery.eta}</p>
                                        </div>
                                        <span className={`delivery-status ${delivery.status.toLowerCase().replace(' ', '-')}`}>
                                            {delivery.status}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </section>
                    </div>
                </div>

                {/* Top Products */}
                <section className="top-products-section">
                    <div className="container">
                        <h2 className="section-title">Produits les plus vendus</h2>
                        <div className="products-grid">
                            {topProducts.map(product => (
                                <div key={product.id} className="product-card">
                                    <div className="product-image">{product.image}</div>
                                    <div className="product-content">
                                        <h3 className="product-name">{product.name}</h3>
                                        <div className="product-stats">
                                            <div className="product-stat">
                                                <span className="stat-label">Ventes</span>
                                                <span className="stat-value">{product.sales}</span>
                                            </div>
                                            <div className="product-stat">
                                                <span className="stat-label">Revenus</span>
                                                <span className="stat-value">{product.revenue.toFixed(2)}€</span>
                                            </div>
                                            <div className="product-stat">
                                                <span className="stat-label">Stock</span>
                                                <span className={`stat-value ${product.stock < 10 ? 'low-stock' : ''}`}>
                                                    {product.stock}
                                                </span>
                                            </div>
                                        </div>
                                        <button className="product-button">Gérer le produit</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="merchant-footer">
                <div className="container">
                    <p>© 2024 Markethique - Espace Vendeur</p>
                </div>
            </footer>
        </div>
    );
};

export default MerchantHomePage;

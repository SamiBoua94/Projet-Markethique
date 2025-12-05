import { useState } from 'react';
import './ClientHomePage.css';

const ClientHomePage = () => {
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [showCartMenu, setShowCartMenu] = useState(false);

    // Mock user data
    const user = {
        name: 'Marie Dupont',
        email: 'marie.dupont@email.com',
        avatar: '👩',
        memberSince: '2023'
    };

    const cartItems = [
        { id: 1, name: 'Casque Audio', price: 149.99, quantity: 1, image: '🎧' },
        { id: 2, name: 'T-shirt Bio', price: 29.99, quantity: 2, image: '👕' }
    ];

    const favorites = [
        { id: 1, name: 'Bouteille Réutilisable', price: 24.99, shop: 'Boutique Éco', image: '💧' },
        { id: 2, name: 'Livre Développement', price: 19.99, shop: 'Librairie', image: '📚' },
        { id: 3, name: 'Baskets Éco', price: 89.99, shop: 'Mode Éthique', image: '👟' }
    ];

    const recentOrders = [
        { id: 'CMD-001', date: '2024-12-01', total: 89.99, status: 'Livré', items: 2 },
        { id: 'CMD-002', date: '2024-11-28', total: 149.99, status: 'En transit', items: 1 },
        { id: 'CMD-003', date: '2024-11-20', total: 59.98, status: 'Livré', items: 3 }
    ];

    const messages = [
        { id: 1, from: 'Tech Innovation', subject: 'Votre commande a été expédiée', unread: true, time: '10:30' },
        { id: 2, from: 'Support Markethique', subject: 'Réponse à votre question', unread: true, time: 'Hier' },
        { id: 3, from: 'Boutique Éco', subject: 'Nouveaux produits disponibles', unread: false, time: '2 jours' }
    ];

    const recommendedProducts = [
        { id: 1, name: 'Montre Connectée', price: 199.99, rating: 4.7, image: '⌚' },
        { id: 2, name: 'Sac à Dos Éco', price: 79.99, rating: 4.8, image: '🎒' },
        { id: 3, name: 'Gourde Isotherme', price: 34.99, rating: 4.9, image: '🥤' },
        { id: 4, name: 'Powerbank Solaire', price: 49.99, rating: 4.6, image: '🔋' }
    ];

    const totalCart = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const unreadMessages = messages.filter(m => m.unread).length;

    return (
        <div className="client-homepage">
            {/* Header */}
            <header className="client-header">
                <div className="header-container">
                    {/* Logo */}
                    <div className="logo-section">
                        <div className="logo">🌍</div>
                        <h1 className="site-title">Markethique</h1>
                    </div>

                    {/* Search Bar */}
                    <div className="search-section">
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Rechercher une boutique ou un article..."
                        />
                        <button className="search-button">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8" />
                                <path d="m21 21-4.35-4.35" />
                            </svg>
                        </button>
                    </div>

                    {/* Header Actions */}
                    <div className="header-actions">
                        {/* Help/Settings */}
                        <button className="icon-button" title="Aide & Paramètres">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="10" />
                                <path d="M12 16v-4M12 8h.01" />
                            </svg>
                        </button>

                        {/* Messages */}
                        <button className="icon-button" title="Messages">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                            </svg>
                            {unreadMessages > 0 && <span className="badge">{unreadMessages}</span>}
                        </button>

                        {/* Cart */}
                        <div className="cart-dropdown">
                            <button
                                className="icon-button cart-button"
                                onMouseEnter={() => setShowCartMenu(true)}
                                onMouseLeave={() => setShowCartMenu(false)}
                            >
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                {cartItems.length > 0 && <span className="badge">{cartItems.length}</span>}
                            </button>

                            {showCartMenu && (
                                <div
                                    className="cart-menu"
                                    onMouseEnter={() => setShowCartMenu(true)}
                                    onMouseLeave={() => setShowCartMenu(false)}
                                >
                                    <div className="cart-header">
                                        <h3>Mon Panier</h3>
                                        <span className="cart-total">{totalCart.toFixed(2)}€</span>
                                    </div>
                                    <div className="cart-items">
                                        {cartItems.map(item => (
                                            <div key={item.id} className="cart-item">
                                                <div className="cart-item-image">{item.image}</div>
                                                <div className="cart-item-info">
                                                    <p className="cart-item-name">{item.name}</p>
                                                    <p className="cart-item-price">{item.price}€ x {item.quantity}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="cart-actions">
                                        <button className="cart-action-btn">Voir mon panier</button>
                                        <button className="cart-action-btn">Historique</button>
                                        <button className="cart-action-btn">Mes favoris</button>
                                        <button className="cart-action-btn">Wishlist</button>
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
                                <div className="user-avatar">{user.avatar}</div>
                                <div className="user-info">
                                    <span className="user-name">{user.name}</span>
                                    <span className="user-label">Client</span>
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
                                        <div className="user-avatar-large">{user.avatar}</div>
                                        <div>
                                            <p className="user-menu-name">{user.name}</p>
                                            <p className="user-menu-email">{user.email}</p>
                                        </div>
                                    </div>
                                    <div className="user-menu-divider"></div>
                                    <button className="user-menu-item">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                            <circle cx="12" cy="7" r="4" />
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
            <main className="client-main">
                {/* Welcome Section */}
                <section className="welcome-section">
                    <div className="container">
                        <h2 className="welcome-title">Bonjour {user.name.split(' ')[0]} ! 👋</h2>
                        <p className="welcome-subtitle">Que souhaitez-vous faire aujourd'hui ?</p>
                    </div>
                </section>

                {/* Quick Actions */}
                <section className="quick-actions-section">
                    <div className="container">
                        <div className="quick-actions-grid">
                            <div className="quick-action-card">
                                <div className="quick-action-icon">🛒</div>
                                <h3>Mon Panier</h3>
                                <p>{cartItems.length} articles</p>
                                <p className="quick-action-value">{totalCart.toFixed(2)}€</p>
                            </div>
                            <div className="quick-action-card">
                                <div className="quick-action-icon">❤️</div>
                                <h3>Mes Favoris</h3>
                                <p>{favorites.length} produits</p>
                            </div>
                            <div className="quick-action-card">
                                <div className="quick-action-icon">📦</div>
                                <h3>Mes Commandes</h3>
                                <p>{recentOrders.length} commandes</p>
                            </div>
                            <div className="quick-action-card">
                                <div className="quick-action-icon">💬</div>
                                <h3>Messages</h3>
                                <p>{unreadMessages} non lus</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Recent Orders */}
                <section className="orders-section">
                    <div className="container">
                        <h2 className="section-title">Mes commandes récentes</h2>
                        <div className="orders-list">
                            {recentOrders.map(order => (
                                <div key={order.id} className="order-card">
                                    <div className="order-header">
                                        <div>
                                            <p className="order-id">Commande #{order.id}</p>
                                            <p className="order-date">{order.date}</p>
                                        </div>
                                        <span className={`order-status ${order.status.toLowerCase().replace(' ', '-')}`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <div className="order-details">
                                        <p>{order.items} article{order.items > 1 ? 's' : ''}</p>
                                        <p className="order-total">{order.total.toFixed(2)}€</p>
                                    </div>
                                    <button className="order-button">Voir détails</button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Favorites */}
                <section className="favorites-section">
                    <div className="container">
                        <h2 className="section-title">Mes favoris</h2>
                        <div className="favorites-grid">
                            {favorites.map(product => (
                                <div key={product.id} className="favorite-card">
                                    <div className="favorite-image">{product.image}</div>
                                    <div className="favorite-content">
                                        <p className="favorite-shop">{product.shop}</p>
                                        <h3 className="favorite-name">{product.name}</h3>
                                        <p className="favorite-price">{product.price}€</p>
                                        <button className="favorite-button">Ajouter au panier</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Recommendations */}
                <section className="recommendations-section">
                    <div className="container">
                        <h2 className="section-title">Recommandations pour vous</h2>
                        <div className="recommendations-grid">
                            {recommendedProducts.map(product => (
                                <div key={product.id} className="recommendation-card">
                                    <div className="recommendation-image">{product.image}</div>
                                    <div className="recommendation-content">
                                        <h3 className="recommendation-name">{product.name}</h3>
                                        <div className="recommendation-rating">
                                            <span className="star">⭐</span>
                                            <span>{product.rating}</span>
                                        </div>
                                        <p className="recommendation-price">{product.price}€</p>
                                        <button className="recommendation-button">Acheter</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            {/* Footer */}
            <footer className="client-footer">
                <div className="container">
                    <p>© 2024 Markethique. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default ClientHomePage;

import { useState } from 'react';
import './EditAccountPage.css';

const EditAccountPage = () => {
    const [activeTab, setActiveTab] = useState('info');
    const [formData, setFormData] = useState({
        shopName: 'Tech Innovation',
        description: 'Boutique spécialisée dans les dernières technologies et gadgets innovants.',
        email: 'contact@techinnovation.com',
        phone: '+33 1 23 45 67 89',
        address: '123 Rue de la Tech, 75001 Paris',
        website: 'www.techinnovation.com'
    });

    const [designSettings, setDesignSettings] = useState({
        primaryColor: '#667eea',
        secondaryColor: '#764ba2',
        theme: 'modern'
    });

    const [products, setProducts] = useState([
        { id: 1, name: 'Casque Audio Premium', price: 149.99, stock: 23, active: true, image: '🎧' },
        { id: 2, name: 'Souris Gaming', price: 69.99, stock: 15, active: true, image: '🖱️' },
        { id: 3, name: 'Clavier Mécanique', price: 139.99, stock: 8, active: false, image: '⌨️' }
    ]);

    const [subscriptions, setSubscriptions] = useState({
        plan: 'premium',
        features: ['Analytics avancées', 'Support prioritaire', 'Promotions illimitées'],
        nextBilling: '2025-01-05',
        price: 29.99
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleDesignChange = (e) => {
        const { name, value } = e.target;
        setDesignSettings(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        console.log('Saving changes...', formData);
        alert('Modifications enregistrées avec succès !');
    };

    return (
        <div className="edit-account-page">
            {/* Header */}
            <header className="edit-header">
                <div className="container">
                    <div className="header-content">
                        <div className="header-title">
                            <h1>Gérer mon compte</h1>
                            <p>Personnalisez votre boutique et gérez vos paramètres</p>
                        </div>
                        <button className="save-button" onClick={handleSave}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            Enregistrer les modifications
                        </button>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <div className="tabs-container">
                <div className="container">
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === 'info' ? 'active' : ''}`}
                            onClick={() => setActiveTab('info')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                <circle cx="12" cy="7" r="4" />
                            </svg>
                            Informations
                        </button>
                        <button
                            className={`tab ${activeTab === 'design' ? 'active' : ''}`}
                            onClick={() => setActiveTab('design')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M12 1v6m0 6v6M1 12h6m6 0h6" />
                            </svg>
                            Design
                        </button>
                        <button
                            className={`tab ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                            </svg>
                            Articles
                        </button>
                        <button
                            className={`tab ${activeTab === 'subscription' ? 'active' : ''}`}
                            onClick={() => setActiveTab('subscription')}
                        >
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                            </svg>
                            Abonnements
                        </button>
                    </div>
                </div>
            </div>

            {/* Content */}
            <main className="edit-content">
                <div className="container">
                    {/* Informations Tab */}
                    {activeTab === 'info' && (
                        <div className="content-section">
                            <h2 className="section-title">Modifier mes informations</h2>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label htmlFor="shopName">Nom de la boutique</label>
                                    <input
                                        type="text"
                                        id="shopName"
                                        name="shopName"
                                        value={formData.shopName}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email de contact</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Téléphone</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="website">Site web</label>
                                    <input
                                        type="url"
                                        id="website"
                                        name="website"
                                        value={formData.website}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="address">Adresse</label>
                                    <input
                                        type="text"
                                        id="address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleInputChange}
                                        className="form-input"
                                    />
                                </div>
                                <div className="form-group full-width">
                                    <label htmlFor="description">Description de la boutique</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        className="form-textarea"
                                        rows="5"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Design Tab */}
                    {activeTab === 'design' && (
                        <div className="content-section">
                            <h2 className="section-title">Changer le design de la boutique</h2>
                            <div className="design-section">
                                <div className="design-card">
                                    <h3>Couleurs</h3>
                                    <div className="color-picker-grid">
                                        <div className="color-group">
                                            <label htmlFor="primaryColor">Couleur principale</label>
                                            <div className="color-picker-wrapper">
                                                <input
                                                    type="color"
                                                    id="primaryColor"
                                                    name="primaryColor"
                                                    value={designSettings.primaryColor}
                                                    onChange={handleDesignChange}
                                                    className="color-picker"
                                                />
                                                <span className="color-value">{designSettings.primaryColor}</span>
                                            </div>
                                        </div>
                                        <div className="color-group">
                                            <label htmlFor="secondaryColor">Couleur secondaire</label>
                                            <div className="color-picker-wrapper">
                                                <input
                                                    type="color"
                                                    id="secondaryColor"
                                                    name="secondaryColor"
                                                    value={designSettings.secondaryColor}
                                                    onChange={handleDesignChange}
                                                    className="color-picker"
                                                />
                                                <span className="color-value">{designSettings.secondaryColor}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="design-card">
                                    <h3>Thème</h3>
                                    <div className="theme-selector">
                                        <div className={`theme-option ${designSettings.theme === 'modern' ? 'active' : ''}`}
                                            onClick={() => setDesignSettings(prev => ({ ...prev, theme: 'modern' }))}>
                                            <div className="theme-preview modern"></div>
                                            <span>Moderne</span>
                                        </div>
                                        <div className={`theme-option ${designSettings.theme === 'classic' ? 'active' : ''}`}
                                            onClick={() => setDesignSettings(prev => ({ ...prev, theme: 'classic' }))}>
                                            <div className="theme-preview classic"></div>
                                            <span>Classique</span>
                                        </div>
                                        <div className={`theme-option ${designSettings.theme === 'minimal' ? 'active' : ''}`}
                                            onClick={() => setDesignSettings(prev => ({ ...prev, theme: 'minimal' }))}>
                                            <div className="theme-preview minimal"></div>
                                            <span>Minimaliste</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Products Tab */}
                    {activeTab === 'products' && (
                        <div className="content-section">
                            <div className="section-header">
                                <h2 className="section-title">Gérer mes articles</h2>
                                <button className="add-button">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="12" y1="8" x2="12" y2="16" />
                                        <line x1="8" y1="12" x2="16" y2="12" />
                                    </svg>
                                    Ajouter un article
                                </button>
                            </div>
                            <div className="products-list">
                                {products.map(product => (
                                    <div key={product.id} className="product-item">
                                        <div className="product-image">{product.image}</div>
                                        <div className="product-info">
                                            <h3 className="product-name">{product.name}</h3>
                                            <p className="product-details">{product.price}€ • Stock: {product.stock}</p>
                                        </div>
                                        <div className="product-status">
                                            <span className={`status-badge ${product.active ? 'active' : 'inactive'}`}>
                                                {product.active ? 'Actif' : 'Inactif'}
                                            </span>
                                        </div>
                                        <div className="product-actions">
                                            <button className="action-btn edit">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                                Modifier
                                            </button>
                                            <button className="action-btn delete">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <polyline points="3 6 5 6 21 6" />
                                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                                </svg>
                                                Supprimer
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Subscription Tab */}
                    {activeTab === 'subscription' && (
                        <div className="content-section">
                            <h2 className="section-title">Abonnements & Service +</h2>
                            <div className="subscription-card">
                                <div className="subscription-header">
                                    <div className="plan-badge premium">Plan Premium</div>
                                    <div className="plan-price">{subscriptions.price}€<span>/mois</span></div>
                                </div>
                                <div className="subscription-features">
                                    <h3>Fonctionnalités incluses:</h3>
                                    <ul>
                                        {subscriptions.features.map((feature, index) => (
                                            <li key={index}>
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <polyline points="20 6 9 17 4 12" />
                                                </svg>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="subscription-info">
                                    <p>Prochaine facturation: <strong>{subscriptions.nextBilling}</strong></p>
                                </div>
                                <div className="subscription-actions">
                                    <button className="upgrade-button">Passer au plan Entreprise</button>
                                    <button className="cancel-button">Annuler l'abonnement</button>
                                </div>
                            </div>

                            <div className="premium-services">
                                <h3 className="services-title">Services Premium +</h3>
                                <div className="services-grid">
                                    <div className="service-card">
                                        <div className="service-icon">📊</div>
                                        <h4>Analytics Pro</h4>
                                        <p>Statistiques détaillées sur vos ventes</p>
                                        <button className="service-button">Activer</button>
                                    </div>
                                    <div className="service-card active">
                                        <div className="service-icon">🎯</div>
                                        <h4>Marketing Boost</h4>
                                        <p>Campagnes promotionnelles avancées</p>
                                        <button className="service-button">Activé ✓</button>
                                    </div>
                                    <div className="service-card">
                                        <div className="service-icon">🚀</div>
                                        <h4>Livraison Express</h4>
                                        <p>Options de livraison rapide</p>
                                        <button className="service-button">Activer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="edit-footer">
                <div className="container">
                    <p>© 2024 Markethique - Gestion de compte</p>
                </div>
            </footer>
        </div>
    );
};

export default EditAccountPage;

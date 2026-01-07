import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './VendorPage.css';

const API_BASE = 'http://localhost:4000/api';

const VendorPage = () => {
    const { sellerId } = useParams();
    const navigate = useNavigate();
    const [seller, setSeller] = useState(null);
    const [products, setProducts] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [ratingDistribution, setRatingDistribution] = useState({});
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('products');
    const [sortBy, setSortBy] = useState('newest');

    useEffect(() => {
        fetchSellerData();
    }, [sellerId]);

    useEffect(() => {
        if (seller) {
            fetchProducts();
        }
    }, [seller, sortBy]);

    const fetchSellerData = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_BASE}/sellers/${sellerId}`);
            if (!response.ok) throw new Error('Seller not found');
            const data = await response.json();
            setSeller(data);

            // Fetch reviews
            const reviewsResponse = await fetch(`${API_BASE}/sellers/${sellerId}/reviews`);
            if (reviewsResponse.ok) {
                const reviewsData = await reviewsResponse.json();
                setReviews(reviewsData.reviews);
                setRatingDistribution(reviewsData.rating_distribution);
            }
        } catch (error) {
            console.error('Error fetching seller:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchProducts = async () => {
        try {
            const response = await fetch(`${API_BASE}/sellers/${sellerId}/products?sort=${sortBy}`);
            if (response.ok) {
                const data = await response.json();
                setProducts(data.products);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' });
    };

    const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span key={i} className={`star ${i <= rating ? 'filled' : ''}`}>
                    ★
                </span>
            );
        }
        return stars;
    };

    if (loading) {
        return (
            <div className="vendor-page">
                <div className="loading-container">
                    <div className="loading-spinner"></div>
                    <p>Chargement de la boutique...</p>
                </div>
            </div>
        );
    }

    if (!seller) {
        return (
            <div className="vendor-page">
                <div className="error-container">
                    <h2>Boutique introuvable</h2>
                    <p>Cette boutique n'existe pas ou n'est plus disponible.</p>
                    <button onClick={() => navigate('/')} className="back-home-btn">
                        Retour à l'accueil
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="vendor-page">
            {/* Header */}
            <header className="vendor-header">
                <div className="header-container">
                    <div className="logo-section" onClick={() => navigate('/')}>
                        <div className="logo">🌍</div>
                        <h1 className="site-title">Markethique</h1>
                    </div>
                    <div className="header-actions">
                        <button className="back-btn" onClick={() => navigate(-1)}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 12H5M12 19l-7-7 7-7" />
                            </svg>
                            Retour
                        </button>
                    </div>
                </div>
            </header>

            {/* Vendor Hero */}
            <section className="vendor-hero">
                <div className="vendor-hero-content">
                    <div className="vendor-avatar">
                        {seller.logo_url ? (
                            <img src={seller.logo_url} alt={seller.shop_name} />
                        ) : (
                            <span className="avatar-placeholder">🏪</span>
                        )}
                    </div>
                    <div className="vendor-info">
                        <div className="vendor-name-row">
                            <h1 className="vendor-name">{seller.shop_name}</h1>
                            {seller.is_verified && (
                                <span className="verified-badge" title="Vendeur certifié">
                                    <svg viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Certifié
                                </span>
                            )}
                        </div>
                        <p className="vendor-owner">par {seller.name}</p>

                        <div className="vendor-stats">
                            <div className="stat-item">
                                <span className="stat-icon">⭐</span>
                                <span className="stat-value">
                                    {seller.average_rating || 'N/A'}
                                </span>
                                <span className="stat-label">
                                    ({seller.review_count} avis)
                                </span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-icon">📦</span>
                                <span className="stat-value">{seller.product_count}</span>
                                <span className="stat-label">produits</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-icon">🛒</span>
                                <span className="stat-value">{seller.sales_count}</span>
                                <span className="stat-label">ventes</span>
                            </div>
                            <div className="stat-divider"></div>
                            <div className="stat-item">
                                <span className="stat-icon">📅</span>
                                <span className="stat-value">Membre depuis</span>
                                <span className="stat-label">{formatDate(seller.member_since)}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section className="vendor-about">
                <div className="container">
                    <div className="about-grid">
                        <div className="about-description">
                            <h2>À propos de la boutique</h2>
                            <p>{seller.description || 'Aucune description disponible.'}</p>
                        </div>
                        <div className="about-contact">
                            <h3>Contact</h3>
                            <div className="contact-info">
                                {seller.address && (
                                    <div className="contact-item">
                                        <span className="contact-icon">📍</span>
                                        <span>{seller.address}</span>
                                    </div>
                                )}
                                {seller.phone && (
                                    <div className="contact-item">
                                        <span className="contact-icon">📞</span>
                                        <span>{seller.phone}</span>
                                    </div>
                                )}
                                {seller.email && (
                                    <div className="contact-item">
                                        <span className="contact-icon">✉️</span>
                                        <span>{seller.email}</span>
                                    </div>
                                )}
                            </div>
                            <button className="contact-btn">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                                </svg>
                                Contacter le vendeur
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tabs Navigation */}
            <div className="vendor-tabs">
                <div className="container">
                    <div className="tabs-nav">
                        <button
                            className={`tab-btn ${activeTab === 'products' ? 'active' : ''}`}
                            onClick={() => setActiveTab('products')}
                        >
                            🛍️ Produits ({seller.product_count})
                        </button>
                        <button
                            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
                            onClick={() => setActiveTab('reviews')}
                        >
                            ⭐ Avis ({seller.review_count})
                        </button>
                    </div>
                </div>
            </div>

            {/* Tab Content */}
            <main className="vendor-main">
                <div className="container">
                    {activeTab === 'products' && (
                        <section className="products-section">
                            <div className="section-header">
                                <h2>Catalogue produits</h2>
                                <div className="sort-controls">
                                    <label htmlFor="sort">Trier par :</label>
                                    <select
                                        id="sort"
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                    >
                                        <option value="newest">Plus récents</option>
                                        <option value="oldest">Plus anciens</option>
                                        <option value="price_asc">Prix croissant</option>
                                        <option value="price_desc">Prix décroissant</option>
                                    </select>
                                </div>
                            </div>

                            {products.length > 0 ? (
                                <div className="products-grid">
                                    {products.map((product) => (
                                        <div key={product.id} className="product-card">
                                            <div className="product-image">
                                                {product.main_image_url ? (
                                                    <img src={product.main_image_url} alt={product.title} />
                                                ) : (
                                                    <span className="product-placeholder">🛍️</span>
                                                )}
                                            </div>
                                            <div className="product-content">
                                                <span className="product-category">{product.category_name || 'Non catégorisé'}</span>
                                                <h3 className="product-name">{product.title}</h3>
                                                <div className="product-rating">
                                                    {product.average_rating ? (
                                                        <>
                                                            <span className="star filled">★</span>
                                                            <span>{product.average_rating}</span>
                                                            <span className="reviews">({product.review_count})</span>
                                                        </>
                                                    ) : (
                                                        <span className="no-rating">Aucun avis</span>
                                                    )}
                                                </div>
                                                <div className="product-pricing">
                                                    <span className="product-price">{product.price}€</span>
                                                    {product.stock > 0 ? (
                                                        <span className="in-stock">En stock</span>
                                                    ) : (
                                                        <span className="out-of-stock">Rupture</span>
                                                    )}
                                                </div>
                                                <button className="product-button">Ajouter au panier</button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <span className="empty-icon">📦</span>
                                    <h3>Aucun produit</h3>
                                    <p>Cette boutique n'a pas encore de produits.</p>
                                </div>
                            )}
                        </section>
                    )}

                    {activeTab === 'reviews' && (
                        <section className="reviews-section">
                            <div className="reviews-overview">
                                <div className="rating-summary">
                                    <div className="overall-rating">
                                        <span className="rating-number">{seller.average_rating || 'N/A'}</span>
                                        <div className="rating-stars">
                                            {renderStars(Math.round(seller.average_rating || 0))}
                                        </div>
                                        <span className="rating-count">{seller.review_count} avis</span>
                                    </div>
                                    <div className="rating-distribution">
                                        {[5, 4, 3, 2, 1].map((star) => (
                                            <div key={star} className="distribution-row">
                                                <span className="star-label">{star} ★</span>
                                                <div className="distribution-bar">
                                                    <div
                                                        className="distribution-fill"
                                                        style={{
                                                            width: `${seller.review_count > 0
                                                                    ? (ratingDistribution[star] / seller.review_count) * 100
                                                                    : 0
                                                                }%`
                                                        }}
                                                    ></div>
                                                </div>
                                                <span className="distribution-count">{ratingDistribution[star] || 0}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {reviews.length > 0 ? (
                                <div className="reviews-list">
                                    {reviews.map((review) => (
                                        <div key={review.id} className="review-card">
                                            <div className="review-header">
                                                <div className="reviewer-info">
                                                    <span className="reviewer-avatar">👤</span>
                                                    <div>
                                                        <span className="reviewer-name">{review.reviewer_name}</span>
                                                        <span className="review-date">{formatDate(review.created_at)}</span>
                                                    </div>
                                                </div>
                                                <div className="review-rating">
                                                    {renderStars(review.rating)}
                                                </div>
                                            </div>
                                            <p className="review-product">Sur : {review.product_title}</p>
                                            <p className="review-comment">{review.comment || 'Aucun commentaire.'}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="empty-state">
                                    <span className="empty-icon">⭐</span>
                                    <h3>Aucun avis</h3>
                                    <p>Cette boutique n'a pas encore reçu d'avis.</p>
                                </div>
                            )}
                        </section>
                    )}
                </div>
            </main>

            {/* Footer */}
            <footer className="vendor-footer">
                <div className="container">
                    <p>© 2024 Markethique. Tous droits réservés.</p>
                </div>
            </footer>
        </div>
    );
};

export default VendorPage;

import { useState } from 'react';
import './HomePage.css';

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    'Art & Artisanat ', 'Mode & Accessoires', 'Cosmétiques', 'Services'
  ];

  const featuredShops = [
    {
      id: 1,
      name: 'Boutique Éco',
      description: 'Produits écologiques et durables',
      image: '🌿',
      rating: 4.8,
      products: 245
    },
    {
      id: 2,
      name: 'Tech Innovation',
      description: 'Les dernières technologies',
      image: '💻',
      rating: 4.9,
      products: 180
    },
    {
      id: 3,
      name: 'Mode Éthique',
      description: 'Vêtements responsables',
      image: '👗',
      rating: 4.7,
      products: 320
    },
    {
      id: 4,
      name: 'Bio & Local',
      description: 'Produits locaux et biologiques',
      image: '🥗',
      rating: 4.9,
      products: 156
    }
  ];

  const promotions = [
    {
      id: 1,
      title: 'Soldes d\'Hiver',
      discount: '-50%',
      description: 'Sur une sélection de produits',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      title: 'Livraison Gratuite',
      discount: '0€',
      description: 'Pour toute commande > 50€',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      title: 'Nouveautés',
      discount: '-30%',
      description: 'Découvrez nos nouveaux produits',
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    }
  ];

  const featuredProducts = [
    {
      id: 1,
      name: 'Casque Audio Premium',
      shop: 'Tech Innovation',
      price: 149.99,
      oldPrice: 199.99,
      image: '🎧',
      rating: 4.5,
      reviews: 234
    },
    {
      id: 2,
      name: 'T-shirt Bio',
      shop: 'Mode Éthique',
      price: 29.99,
      oldPrice: 39.99,
      image: '👕',
      rating: 4.8,
      reviews: 156
    },
    {
      id: 3,
      name: 'Bouteille Réutilisable',
      shop: 'Boutique Éco',
      price: 24.99,
      image: '💧',
      rating: 4.9,
      reviews: 89
    },
    {
      id: 4,
      name: 'Pack Fruits Bio',
      shop: 'Bio & Local',
      price: 19.99,
      image: '🍎',
      rating: 4.7,
      reviews: 178
    }
  ];

  return (
    <div className="client-homepage">
      {/* Header - Same style as ClientHomePage */}
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
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
            {/* Login Button */}
            <button className="login-btn" onClick={() => window.location.href = '/login'}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              Se connecter
            </button>
          </div>
        </div>
      </header>

      {/* Categories Bar */}
      <div className="categories-bar">
        <div className="categories-container">
          {categories.map((category, index) => (
            <button key={index} className="category-button">
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <main className="client-main">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-content">
            <h2 className="hero-title">Bienvenue sur Markethique</h2>
            <p className="hero-subtitle">
              La marketplace éthique qui connecte consommateurs et commerçants responsables
            </p>
            <button className="hero-cta">Découvrir les boutiques</button>
          </div>
        </section>

        {/* Promotions Section */}
        <section className="promotions-section">
          <div className="container">
            <h2 className="section-title">Promotions en cours</h2>
            <div className="promotions-grid">
              {promotions.map(promo => (
                <div key={promo.id} className="promo-card" style={{ background: promo.gradient }}>
                  <div className="promo-discount">{promo.discount}</div>
                  <h3 className="promo-title">{promo.title}</h3>
                  <p className="promo-description">{promo.description}</p>
                  <button className="promo-button">Voir les offres</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Shops */}
        <section className="shops-section">
          <div className="container">
            <h2 className="section-title">Boutiques en vedette</h2>
            <div className="shops-grid">
              {featuredShops.map(shop => (
                <div key={shop.id} className="shop-card">
                  <div className="shop-image">{shop.image}</div>
                  <div className="shop-content">
                    <h3 className="shop-name">{shop.name}</h3>
                    <p className="shop-description">{shop.description}</p>
                    <div className="shop-stats">
                      <div className="shop-rating">
                        <span className="star">⭐</span>
                        <span>{shop.rating}</span>
                      </div>
                      <div className="shop-products">{shop.products} produits</div>
                    </div>
                    <button className="shop-button">Visiter la boutique</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="products-section">
          <div className="container">
            <h2 className="section-title">Articles mis en avant</h2>
            <div className="products-grid">
              {featuredProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">{product.image}</div>
                  <div className="product-content">
                    <p className="product-shop">{product.shop}</p>
                    <h3 className="product-name">{product.name}</h3>
                    <div className="product-rating">
                      <span className="star">⭐</span>
                      <span>{product.rating}</span>
                      <span className="reviews">({product.reviews})</span>
                    </div>
                    <div className="product-pricing">
                      <span className="product-price">{product.price}€</span>
                      {product.oldPrice && (
                        <span className="product-old-price">{product.oldPrice}€</span>
                      )}
                    </div>
                    <button className="product-button">Ajouter au panier</button>
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

export default HomePage;

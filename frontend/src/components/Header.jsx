import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';
import { categories } from '../data/products';
import { isAuthenticated, logout, getCurrentUser } from '../../services/authService';

const Header = ({ cartCount, onSearchChange, selectedCategory, onCategoryChange }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [currentLang, setCurrentLang] = useState('EN');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [authenticated, setAuthenticated] = useState(isAuthenticated());
    const navigate = useNavigate();
    const user = getCurrentUser();

    useEffect(() => {
        const handleAuthChange = () => {
            setAuthenticated(isAuthenticated());
        };
        
        window.addEventListener('authChange', handleAuthChange);
        
        return () => {
            window.removeEventListener('authChange', handleAuthChange);
        };
    }, []);

    const handleLogout = () => {
        logout();
        window.dispatchEvent(new Event('authChange'));
        navigate('/');
    };

    const languages = [
        { code: 'EN', flag: '🇬🇧' },
        { code: 'FR', flag: '🇫🇷' }
    ];

    const toggleLangMenu = () => {
        setShowLangMenu(!showLangMenu);
    };

    const changeLanguage = (lang) => {
        setCurrentLang(lang);
        setShowLangMenu(false);
    };

    const currentLangData = languages.find(lang => lang.code === currentLang) || languages[0];

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchQuery(value);
        onSearchChange(value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <>
            <header className="header">
                <div className="header-container container">
                    <div className="header-left">
                        <div className="lang-selector">
                            <button
                                className="lang-btn"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setShowLangMenu(!showLangMenu);
                                }}
                            >
                                <span className="lang-flag">🌐</span>
                                <span className="lang-text">{currentLang}</span>
                                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`lang-arrow ${showLangMenu ? 'rotate-180' : ''}`}>
                                    <path d="M6 9l6 6 6-6" />
                                </svg>
                            </button>
                            {showLangMenu && (
                                <div className="lang-menu">
                                    <button
                                        className={`lang-option ${currentLang === 'FR' ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentLang('FR');
                                            setShowLangMenu(false);
                                        }}
                                    >
                                        <span className="lang-flag">🇫🇷</span>
                                        <span>Français</span>
                                    </button>
                                    <button
                                        className={`lang-option ${currentLang === 'EN' ? 'active' : ''}`}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            setCurrentLang('EN');
                                            setShowLangMenu(false);
                                        }}
                                    >
                                        <span className="lang-flag">🇬🇧</span>
                                        <span>English</span>
                                    </button>
                                </div>
                            )}
                        </div>
                        <div className="header-logo">
                            <img src="/logo.jpg" alt="Markethique Logo" className="header-logo-img" />
                            <span className="header-brand">Markethique</span>
                        </div>
                    </div>

                    <form className="header-search" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="search-input"
                            placeholder="Search Markethique"
                            value={searchQuery}
                            onChange={handleSearch}
                        />
                        <button type="submit" className="search-btn">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </form>

                    <button
                        className="header-mobile-toggle"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    >
                        <span className="mobile-toggle-lines">
                            <span className="mobile-toggle-line" />
                            <span className="mobile-toggle-line" />
                            <span className="mobile-toggle-line" />
                        </span>
                    </button>

                    <div className="header-actions">
                        <button className="header-action-btn" aria-label="Search">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                        
                        <Link to="/cart" className="header-action-btn" aria-label="Cart">
                            <div className="cart-icon">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.3 4.6c-.3.6-.1 1.3.5 1.7.6.4 1.3.4 1.8-.1L12 12m0 0h.01M12 12h.01" />
                                </svg>
                                {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                            </div>
                        </Link>
                        
                        {!authenticated ? (
                            <div className="auth-buttons">
                                <Link to="/login" className="btn btn-link">Connexion</Link>
                                <Link to="/register" className="btn btn-primary">S'inscrire</Link>
                            </div>
                        ) : (
                            <div className="user-menu-container">
                                <button 
                                    className="header-action-btn user-avatar" 
                                    onClick={() => setShowUserMenu(!showUserMenu)}
                                    aria-label="User menu"
                                >
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                </button>
                                
                                {showUserMenu && (
                                    <div className="user-dropdown">
                                        <div className="user-info">
                                            <p className="user-name">{user?.username || 'Utilisateur'}</p>
                                            <p className="user-email">{user?.email || ''}</p>
                                        </div>
                                        <div className="dropdown-divider"></div>
                                        <Link 
                                            to="/profile" 
                                            className="dropdown-item"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Mon profil
                                        </Link>
                                        {user?.userType === 'seller' && (
                                            <Link 
                                                to="/seller/dashboard" 
                                                className="dropdown-item"
                                                onClick={() => setShowUserMenu(false)}
                                            >
                                                Tableau de bord vendeur
                                            </Link>
                                        )}
                                        <div className="dropdown-divider"></div>
                                        <button 
                                            className="dropdown-item logout-btn"
                                            onClick={handleLogout}
                                        >
                                            Déconnexion
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </header>

            <nav className="nav-bar">
                <div className="nav-container container">
                    {categories.map(category => (
                        <div key={category.name} className="nav-item">
                            <button
                                className={`nav-btn ${selectedCategory === category.name ? 'active' : ''}`}
                                onClick={() => onCategoryChange(category.name)}
                            >
                                {category.name}
                            </button>
                            {category.subcategories.length > 0 && (
                                <div className="nav-dropdown">
                                    {category.subcategories.map(sub => (
                                        <button key={sub} className="nav-dropdown-item">
                                            {sub}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </nav>
        </>
    );
};

export default Header;

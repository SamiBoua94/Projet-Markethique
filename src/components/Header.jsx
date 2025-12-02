import { useState } from 'react';
import './Header.css';
import { categories } from '../data/products';

const Header = ({ cartCount, onSearchChange, selectedCategory, onCategoryChange }) => {
    const [searchQuery, setSearchQuery] = useState('');

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
                    <div className="header-logo">
                        <img src="/logo.jpg" alt="Markethique Logo" className="header-logo-img" />
                        <span className="header-brand">Markethique</span>
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

                    <div className="header-actions">
                        <div className="header-btn-wrapper">
                            <button className="header-btn">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                    <circle cx="12" cy="7" r="4" />
                                </svg>
                                <span className="header-btn-label">Account</span>
                            </button>
                            <div className="header-dropdown">
                                <button className="header-dropdown-item">Sign in</button>
                                <button className="header-dropdown-item">Sign up</button>
                            </div>
                        </div>
                        <button className="header-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            <span className="header-btn-label">Near Me</span>
                        </button>
                        <button className="header-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
                                <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
                                <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
                            </svg>
                            <span className="header-btn-label">Eco-Wallet</span>
                        </button>
                        <button className="header-btn cart-btn">
                            <div className="cart-icon-wrapper">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <circle cx="9" cy="21" r="1" />
                                    <circle cx="20" cy="21" r="1" />
                                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
                                </svg>
                                {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
                            </div>
                            <span className="header-btn-label">Cart</span>
                        </button>
                        <button className="header-btn">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                            </svg>
                            <span className="header-btn-label">Favorites</span>
                        </button>
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

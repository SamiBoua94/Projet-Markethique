import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductGrid from './components/ProductGrid';
import { products as initialProducts } from './data/products';
import './App.css';

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState(initialProducts);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    let filtered = products;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim() !== '') {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProducts(filtered);
  }, [searchQuery, selectedCategory, products]);

  const handleAddToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }

    console.log(`Added ${product.name} to cart`);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="app">
      <Header
        cartCount={totalCartItems}
        onSearchChange={handleSearchChange}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <Hero />
      <ProductGrid
        products={filteredProducts}
        onAddToCart={handleAddToCart}
      />
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h4>Get to Know Us</h4>
              <ul>
                <li><a href="#about">About Markethique</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#press">Press Releases</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Make Money with Us</h4>
              <ul>
                <li><a href="#sell">Sell on Markethique</a></li>
                <li><a href="#affiliate">Become an Affiliate</a></li>
                <li><a href="#advertise">Advertise Your Products</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Let Us Help You</h4>
              <ul>
                <li><a href="#account">Your Account</a></li>
                <li><a href="#orders">Your Orders</a></li>
                <li><a href="#shipping">Shipping Rates & Policies</a></li>
                <li><a href="#returns">Returns & Replacements</a></li>
              </ul>
            </div>
            <div className="footer-section">
              <h4>Ethical Shopping</h4>
              <ul>
                <li><a href="#sustainability">Our Sustainability</a></li>
                <li><a href="#ethics">Ethical Standards</a></li>
                <li><a href="#impact">Social Impact</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-logo">
              <img src="/logo.jpg" alt="Markethique" className="footer-logo-img" />
              <span>Markethique</span>
            </div>
            <p>&copy; 2024 Markethique. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

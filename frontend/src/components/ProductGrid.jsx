import { useState } from 'react';
import ProductCard from './ProductCard';
import './ProductGrid.css';

const ProductGrid = ({ products, onAddToCart }) => {
    return (
        <section className="product-grid-section">
            <div className="container">
                <div className="section-header">
                    <h2 className="section-title">Results</h2>
                </div>

                <div className="product-grid">
                    {products.map(product => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={onAddToCart}
                        />
                    ))}
                </div>

                {products.length === 0 && (
                    <div className="no-products">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" y1="8" x2="12" y2="12" />
                            <line x1="12" y1="16" x2="12.01" y2="16" />
                        </svg>
                        <p>No products found</p>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ProductGrid;

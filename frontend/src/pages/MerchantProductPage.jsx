import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MerchantProductPage.css';

const MerchantProductPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([
        { id: 1, name: 'Casque Audio Premium', price: 149.99, stock: 23, sold: 145, description: 'Son haute fidélité, réduction de bruit active.', erScore: 4.8, image: '🎧', category: 'Audio' },
        { id: 2, name: 'Souris Gaming', price: 69.99, stock: 15, sold: 89, description: 'Capteur optique 16000 DPI, RGB personnalisable.', erScore: 4.5, image: '🖱️', category: 'Périphériques' },
        { id: 3, name: 'Clavier Mécanique', price: 139.99, stock: 8, sold: 210, description: 'Switches Cherry MX Blue, rétroéclairage.', erScore: 4.9, image: '⌨️', category: 'Périphériques' },
        { id: 4, name: 'Webcam HD', price: 89.99, stock: 19, sold: 56, description: '1080p 60fps, autofocus rapide.', erScore: 4.2, image: '📹', category: 'Vidéo' },
        { id: 5, name: 'Microphone USB', price: 129.99, stock: 5, sold: 34, description: 'Qualité studio, filtre anti-pop inclus.', erScore: 4.7, image: '🎙️', category: 'Audio' },
        { id: 6, name: 'Tapis de Souris XXL', price: 29.99, stock: 42, sold: 567, description: 'Surface lisse, base antidérapante.', erScore: 4.6, image: '⬛', category: 'Accessoires' }
    ]);

    const handleStockChange = (id, change) => {
        setProducts(products.map(product => {
            if (product.id === id) {
                const newStock = Math.max(0, product.stock + change);
                return { ...product, stock: newStock };
            }
            return product;
        }));
    };

    const handleSave = () => {
        // Mock save functionality
        alert('Modifications sauvegardées avec succès !');
    };

    const handleExport = () => {
        // Mock export functionality
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(products));
        const downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", "produits_boutique.json");
        document.body.appendChild(downloadAnchorNode);
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
    };

    return (
        <div className="merchant-product-page">
            <header className="page-header">
                <div className="header-content">
                    <button className="back-button" onClick={() => navigate('/merchant')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                        </svg>
                        Retour au tableau de bord
                    </button>
                    <h1>Gestion des Produits</h1>
                </div>
            </header>

            <main className="page-content">
                <div className="toolbar">
                    <div className="toolbar-left">
                        <button className="action-btn primary" onClick={() => alert('Fonctionnalité Ajouter à venir')}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M12 5v14M5 12h14" />
                            </svg>
                            Ajouter un article
                        </button>
                    </div>
                    <div className="toolbar-right">
                        <button className="tool-btn" onClick={handleSave}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                                <polyline points="17 21 17 13 7 13 7 21" />
                                <polyline points="7 3 7 8 15 8" />
                            </svg>
                            Sauvegarder
                        </button>
                        <button className="tool-btn" onClick={handleExport}>
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Exporter
                        </button>
                    </div>
                </div>

                <div className="products-table-container">
                    <table className="products-table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Produit</th>
                                <th>Description</th>
                                <th>Catégorie</th>
                                <th>Prix TTC</th>
                                <th>Prix HT</th>
                                <th>Vendus</th>
                                <th>Score ER</th>
                                <th>Stock</th>
                                <th>Net Reçus</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map(product => {
                                const priceHT = product.price / 1.2;
                                const netReceived = product.price * 0.85; // Assuming 15% commission
                                return (
                                    <tr key={product.id}>
                                        <td className="id-cell">#{product.id}</td>
                                        <td className="product-cell">
                                            <span className="product-icon">{product.image}</span>
                                            <span className="product-name">{product.name}</span>
                                        </td>
                                        <td className="description-cell" title={product.description}>{product.description}</td>
                                        <td>{product.category}</td>
                                        <td>{product.price.toFixed(2)}€</td>
                                        <td>{priceHT.toFixed(2)}€</td>
                                        <td>{product.sold}</td>
                                        <td>
                                            <span className={`er-score ${product.erScore >= 4.5 ? 'high' : product.erScore >= 4.0 ? 'medium' : 'low'}`}>
                                                {product.erScore}
                                            </span>
                                        </td>
                                        <td className="stock-cell">
                                            <div className="stock-controls">
                                                <button
                                                    className="stock-btn minus"
                                                    onClick={() => handleStockChange(product.id, -1)}
                                                    disabled={product.stock <= 0}
                                                >
                                                    -
                                                </button>
                                                <span className={`stock-value ${product.stock < 10 ? 'low' : ''}`}>
                                                    {product.stock}
                                                </span>
                                                <button
                                                    className="stock-btn plus"
                                                    onClick={() => handleStockChange(product.id, 1)}
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </td>
                                        <td className="net-received-cell">
                                            {netReceived.toFixed(2)}€
                                        </td>
                                        <td>
                                            <button className="edit-btn" title="Modifier">
                                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                                </svg>
                                            </button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default MerchantProductPage;

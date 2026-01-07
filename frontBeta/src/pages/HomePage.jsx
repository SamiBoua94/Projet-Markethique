import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import client from '../api/client';

function HomePage({ search }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const params = {};
        if (search) params.search = search;
        const res = await client.get('/products', { params });
        setProducts(res.data.data || []);
      } catch (err) {
        setError('Erreur lors du chargement des produits');
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, [search]);

  if (loading) {
    return <p>Chargement des produits...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="page page-home">
      <div className="home-hero">
        <h1>Bienvenue sur Amazone</h1>
        <p>Découvrez les meilleurs produits de nos vendeurs, livrés chez vous.</p>
      </div>
      <div className="home-layout">
        <aside className="home-sidebar">
          <h2>Filtres</h2>
          <p className="text-muted">(catégories, prix, etc. à venir)</p>
        </aside>
        <section className="home-products">
          <h2>Résultats</h2>
          <div className="products-grid">
            {products.map((p) => (
              <Link key={p.id} to={`/products/${p.id}`} className="product-card">
                {p.main_image_url && (
                  <img src={`http://localhost:4000${p.main_image_url}`} alt={p.title} />
                )}
                <div className="product-card-body">
                  <h2>{p.title}</h2>
                  <p className="price">{Number(p.price).toFixed(2)} €</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

export default HomePage;

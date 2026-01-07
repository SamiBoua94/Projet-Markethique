import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import client from '../api/client';

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await client.get(`/products/${id}`);
        setProduct(res.data);
      } catch (err) {
        setError("Produit introuvable");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="page page-product">
      <h1>{product.title}</h1>
      {product.main_image_url && (
        <img
          src={`http://localhost:4000${product.main_image_url}`}
          alt={product.title}
          className="product-main-image"
        />
      )}
      <p className="price">{Number(product.price).toFixed(2)} €</p>
      <p>{product.description}</p>
    </div>
  );
}

export default ProductPage;

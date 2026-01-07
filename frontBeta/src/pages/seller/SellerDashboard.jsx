import { useEffect, useState } from 'react';
import client from '../../api/client';

function SellerDashboard() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [form, setForm] = useState({
    id: null,
    title: '',
    price: '',
    stock: '',
    description: '',
  });
  const [saving, setSaving] = useState(false);
  const [imageFile, setImageFile] = useState(null);

  async function loadData() {
    try {
      setLoading(true);
      const [ordersRes, productsRes] = await Promise.all([
        client.get('/orders'),
        client.get('/products'),
      ]);
      setOrders(ordersRes.data || []);
      setProducts((productsRes.data && productsRes.data.data) || []);
    } catch (err) {
      setError('Erreur lors du chargement des données vendeur');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const resetForm = () => {
    setForm({ id: null, title: '', price: '', stock: '', description: '' });
    setImageFile(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleEdit = (product) => {
    setForm({
      id: product.id,
      title: product.title,
      price: String(product.price),
      stock: String(product.stock),
      description: product.description || '',
    });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('price', String(form.price));
      formData.append('stock', String(form.stock));
      if (form.description) formData.append('description', form.description);
      if (imageFile) {
        formData.append('images', imageFile);
      }

      if (form.id) {
        await client.put(`/products/${form.id}`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await client.post('/products', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      resetForm();
      await loadData();
    } catch (err) {
      const apiMessage = err?.response?.data?.message;
      // eslint-disable-next-line no-console
      console.error('Erreur API produit:', err?.response || err);
      alert(apiMessage || "Erreur lors de l'enregistrement du produit");
    } finally {
      setSaving(false);
    }
  };

  const handleToggleActive = async (product) => {
    try {
      await client.put(`/products/${product.id}`, { is_active: !product.is_active });
      await loadData();
    } catch (err) {
      alert("Erreur lors du changement de statut du produit");
    }
  };

  const handleDelete = async (product) => {
    if (!window.confirm('Supprimer ce produit ? (il sera désactivé)')) return;
    try {
      await client.delete(`/products/${product.id}`);
      await loadData();
    } catch (err) {
      alert('Erreur lors de la suppression du produit');
    }
  };

  return (
    <div className="page page-dashboard">
      <h1>Dashboard Vendeur</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <section>
            <h2>Gérer mes produits</h2>
            <form className="product-form" onSubmit={handleSubmit}>
              <div>
                <label>
                  Titre
                  <input
                    name="title"
                    value={form.title}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Prix
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    value={form.price}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Stock
                  <input
                    name="stock"
                    type="number"
                    value={form.stock}
                    onChange={handleChange}
                    required
                  />
                </label>
              </div>
              <div>
                <label>
                  Description
                  <textarea
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div>
                <label>
                  Image principale
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
              <button type="submit" disabled={saving}>
                {saving ? 'Enregistrement...' : form.id ? 'Mettre à jour' : 'Créer'}
              </button>
              {form.id && (
                <button type="button" onClick={resetForm}>
                  Annuler
                </button>
              )}
            </form>

            <h3>Mes produits</h3>
            <ul>
              {products.map((p) => (
                <li key={p.id}>
                  {p.title} - {Number(p.price).toFixed(2)} € (stock: {p.stock}) -{' '}
                  {p.is_active ? 'actif' : 'inactif'}
                  <button type="button" onClick={() => handleEdit(p)}>
                    Éditer
                  </button>
                  <button type="button" onClick={() => handleToggleActive(p)}>
                    {p.is_active ? 'Désactiver' : 'Activer'}
                  </button>
                  <button type="button" onClick={() => handleDelete(p)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Commandes reçues</h2>
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Total</th>
                  <th>Statut</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{Number(o.total_amount).toFixed(2)} €</td>
                    <td>{o.status}</td>
                    <td>{new Date(o.created_at).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </>
      )}
    </div>
  );
}

export default SellerDashboard;

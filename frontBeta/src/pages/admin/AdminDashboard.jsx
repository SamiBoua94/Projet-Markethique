import { useEffect, useState } from 'react';
import client from '../../api/client';

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [categories, setCategories] = useState([]);
  const [coupons, setCoupons] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categoryForm, setCategoryForm] = useState({ id: null, name: '', slug: '' });
  const [couponForm, setCouponForm] = useState({
    id: null,
    code: '',
    discount_type: 'percent',
    discount_value: '',
  });

  async function loadData() {
    try {
      setLoading(true);
      const [usersRes, productsRes, ordersRes, categoriesRes, couponsRes] =
        await Promise.all([
          client.get('/admin/users'),
          client.get('/admin/products'),
          client.get('/orders'),
          client.get('/categories'),
          client.get('/admin/coupons'),
        ]);
      setUsers(usersRes.data || []);
      setProducts(productsRes.data || []);
      setOrders(ordersRes.data || []);
      setCategories(categoriesRes.data || []);
      setCoupons(couponsRes.data || []);
    } catch (err) {
      setError('Erreur lors du chargement des données admin');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleUserUpdate = async (user, updates) => {
    try {
      await client.put(`/admin/users/${user.id}`, updates);
      await loadData();
    } catch (err) {
      alert("Erreur lors de la mise à jour de l'utilisateur");
    }
  };

  const handleCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryEdit = (cat) => {
    setCategoryForm({ id: cat.id, name: cat.name, slug: cat.slug });
  };

  const resetCategoryForm = () => {
    setCategoryForm({ id: null, name: '', slug: '' });
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      if (categoryForm.id) {
        await client.put(`/admin/categories/${categoryForm.id}`, {
          name: categoryForm.name,
          slug: categoryForm.slug,
        });
      } else {
        await client.post('/admin/categories', {
          name: categoryForm.name,
          slug: categoryForm.slug,
        });
      }
      resetCategoryForm();
      await loadData();
    } catch (err) {
      alert('Erreur lors de la sauvegarde de la catégorie');
    }
  };

  const handleCategoryDelete = async (cat) => {
    if (!window.confirm('Supprimer cette catégorie ?')) return;
    try {
      await client.delete(`/admin/categories/${cat.id}`);
      await loadData();
    } catch (err) {
      alert('Erreur lors de la suppression de la catégorie');
    }
  };

  const handleCouponFormChange = (e) => {
    const { name, value } = e.target;
    setCouponForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCouponEdit = (c) => {
    setCouponForm({
      id: c.id,
      code: c.code,
      discount_type: c.discount_type,
      discount_value: String(c.discount_value),
    });
  };

  const resetCouponForm = () => {
    setCouponForm({ id: null, code: '', discount_type: 'percent', discount_value: '' });
  };

  const handleCouponSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        code: couponForm.code,
        discount_type: couponForm.discount_type,
        discount_value: Number(couponForm.discount_value),
      };

      if (couponForm.id) {
        await client.put(`/admin/coupons/${couponForm.id}`, payload);
      } else {
        await client.post('/admin/coupons', payload);
      }
      resetCouponForm();
      await loadData();
    } catch (err) {
      alert('Erreur lors de la sauvegarde du coupon');
    }
  };

  const handleCouponDelete = async (c) => {
    if (!window.confirm('Supprimer ce coupon ?')) return;
    try {
      await client.delete(`/admin/coupons/${c.id}`);
      await loadData();
    } catch (err) {
      alert('Erreur lors de la suppression du coupon');
    }
  };

  return (
    <div className="page page-dashboard">
      <h1>Dashboard Admin</h1>
      {loading && <p>Chargement...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <>
          <section>
            <h2>Utilisateurs</h2>
            <ul>
              {users.map((u) => (
                <li key={u.id}>
                  {u.name} ({u.email}) - {u.role}{' '}
                  {u.is_active ? '' : '(suspendu)'}
                  <select
                    value={u.role}
                    onChange={(e) => handleUserUpdate(u, { role: e.target.value })}
                  >
                    <option value="buyer">buyer</option>
                    <option value="seller">seller</option>
                    <option value="admin">admin</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => handleUserUpdate(u, { is_active: !u.is_active })}
                  >
                    {u.is_active ? 'Suspendre' : 'Réactiver'}
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Catégories</h2>
            <form onSubmit={handleCategorySubmit} className="category-form">
              <label>
                Nom
                <input
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryFormChange}
                  required
                />
              </label>
              <label>
                Slug
                <input
                  name="slug"
                  value={categoryForm.slug}
                  onChange={handleCategoryFormChange}
                  required
                />
              </label>
              <button type="submit">
                {categoryForm.id ? 'Mettre à jour' : 'Créer'}
              </button>
              {categoryForm.id && (
                <button type="button" onClick={resetCategoryForm}>
                  Annuler
                </button>
              )}
            </form>
            <ul>
              {categories.map((c) => (
                <li key={c.id}>
                  {c.name} ({c.slug})
                  <button type="button" onClick={() => handleCategoryEdit(c)}>
                    Éditer
                  </button>
                  <button type="button" onClick={() => handleCategoryDelete(c)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Coupons</h2>
            <form onSubmit={handleCouponSubmit} className="coupon-form">
              <label>
                Code
                <input
                  name="code"
                  value={couponForm.code}
                  onChange={handleCouponFormChange}
                  required
                />
              </label>
              <label>
                Type
                <select
                  name="discount_type"
                  value={couponForm.discount_type}
                  onChange={handleCouponFormChange}
                >
                  <option value="percent">Pourcentage</option>
                  <option value="fixed">Montant fixe</option>
                </select>
              </label>
              <label>
                Valeur
                <input
                  name="discount_value"
                  type="number"
                  step="0.01"
                  value={couponForm.discount_value}
                  onChange={handleCouponFormChange}
                  required
                />
              </label>
              <button type="submit">
                {couponForm.id ? 'Mettre à jour' : 'Créer'}
              </button>
              {couponForm.id && (
                <button type="button" onClick={resetCouponForm}>
                  Annuler
                </button>
              )}
            </form>
            <ul>
              {coupons.map((c) => (
                <li key={c.id}>
                  {c.code} - {c.discount_type} ({Number(c.discount_value).toFixed(2)})
                  <button type="button" onClick={() => handleCouponEdit(c)}>
                    Éditer
                  </button>
                  <button type="button" onClick={() => handleCouponDelete(c)}>
                    Supprimer
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2>Aperçu Produits et Commandes</h2>
            <p>Nombre de produits: {products.length}</p>
            <p>Total commandes: {orders.length}</p>
          </section>
        </>
      )}
    </div>
  );
}

export default AdminDashboard;

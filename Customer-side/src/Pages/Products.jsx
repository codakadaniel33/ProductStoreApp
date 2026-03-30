import { useEffect, useState } from 'react';
import api from '../api.js';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/api/products');
        if (response.data.success) {
          setProducts(response.data.data);
        } else {
          setError(response.data.message || 'Unable to load products');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white px-8 py-10 shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-900">Available Products</h1>
        <p className="mt-3 text-slate-600">These are the products currently posted in the store.</p>
      </div>

      {loading ? (
        <div className="rounded-3xl bg-white px-8 py-10 shadow-lg text-slate-600">Loading products...</div>
      ) : error ? (
        <div className="rounded-3xl bg-white px-8 py-10 shadow-lg text-red-600">{error}</div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl bg-white px-8 py-10 shadow-lg text-slate-600">No products are available right now.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {products.map((product) => (
            <article key={product.id} className="overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl">
              <div className="h-64 bg-slate-100">
                <img
                  src={product.picture}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    ${product.price}
                  </span>
                </div>
                <p className="text-slate-600 leading-7">{product.description}</p>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
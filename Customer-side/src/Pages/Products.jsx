import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import api from '../api.js';

const currencyFormatter = new Intl.NumberFormat('en-TZ', {
  style: 'currency',
  currency: 'TZS',
  maximumFractionDigits: 0,
});

const Products = () => {
  const [searchParams] = useSearchParams();
  const showLatest = searchParams.get('latest') === 'true';
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

  const sortedProducts = [...products].sort((a, b) => b.id - a.id);
  const latestProducts = sortedProducts.slice(0, 10);
  const latestIds = new Set(latestProducts.map((product) => product.id));

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white px-8 py-10 shadow-lg">
        <h1 className="text-3xl font-semibold text-slate-900">Available Products</h1>
        <p className="mt-3 text-slate-600">These are the products currently posted in the store.</p>
      </div>

      {showLatest && latestProducts.length > 0 ? (
        <div className="rounded-3xl bg-white px-6 py-8 shadow-lg sm:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Latest arrivals</h2>
              <p className="mt-2 text-slate-600">Here are the newest products just posted—highlighted with a red NEW badge.</p>
            </div>
            <span className="inline-flex items-center rounded-full bg-red-50 px-3 py-1 text-sm font-semibold text-red-700">
              Latest first
            </span>
          </div>

          <div className="mt-6 grid gap-6 lg:grid-cols-3">
            {latestProducts.map((product) => (
              <Link
                key={product.id}
                to={`/products/${product.id}`}
                className="group overflow-hidden rounded-3xl border border-red-100 bg-slate-50 transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-52 overflow-hidden bg-slate-100">
                  <img
                    src={product.picture}
                    alt={product.name}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                  <span className="absolute left-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white animate-pulse">
                    NEW
                  </span>
                </div>
                <div className="space-y-3 p-5">
                  <h3 className="text-xl font-semibold text-slate-900">{product.name}</h3>
                  <p className="text-slate-600 text-sm leading-6">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-semibold text-slate-900">{currencyFormatter.format(product.price)}</span>
                    <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">New</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : null}

      {loading ? (
        <div className="rounded-3xl bg-white px-8 py-10 shadow-lg">
          <div className="flex h-48 items-center justify-center">
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" aria-hidden="true"></div>
              <span className="sr-only">Loading products</span>
            </div>
          </div>
        </div>
      ) : error ? (
        <div className="rounded-3xl bg-white px-8 py-10 shadow-lg text-red-600">{error}</div>
      ) : products.length === 0 ? (
        <div className="rounded-3xl bg-white px-8 py-10 shadow-lg text-slate-600">No products are available right now.</div>
      ) : (
        <div className="grid gap-6 lg:grid-cols-2">
          {sortedProducts.map((product) => (
            <Link
              key={product.id}
              to={`/products/${product.id}`}
              className="group overflow-hidden rounded-3xl bg-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl hover:cursor-pointer"
            >
              <div className="relative h-64 bg-slate-100">
                <img
                  src={product.picture}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                />
                {latestIds.has(product.id) ? (
                  <span className="absolute right-4 top-4 rounded-full bg-red-600 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-white animate-pulse">
                    NEW
                  </span>
                ) : null}
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="text-xl font-semibold text-slate-900">{product.name}</h2>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                    {currencyFormatter.format(product.price)}
                  </span>
                </div>
                <p className="text-slate-600 leading-7">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  )
}

export default Products
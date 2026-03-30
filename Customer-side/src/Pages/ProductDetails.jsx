import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../api.js';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/api/products/${id}`);
        if (response.data.success) {
          setProduct(response.data.data);
        } else {
          setError(response.data.message || 'Product not found');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Unable to load product');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="rounded-3xl bg-white px-8 py-10 shadow-lg text-slate-600">Loading product...</div>;
  }

  if (error) {
    return <div className="rounded-3xl bg-white px-8 py-10 shadow-lg text-red-600">{error}</div>;
  }

  if (!product) {
    return null;
  }

  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white px-8 py-10 shadow-lg">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start">
          <div className="flex-1 overflow-hidden rounded-3xl bg-slate-100 shadow-inner">
            <img
              src={product.picture}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex-1 space-y-6">
            <div>
              <h1 className="text-4xl font-semibold text-slate-900">{product.name}</h1>
              <p className="mt-3 text-xl font-semibold text-slate-900">${product.price}</p>
            </div>
            <p className="text-slate-600 leading-8">{product.description}</p>
            <div className="flex flex-wrap items-center gap-4">
              <Link
                to="/products"
                className="rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
              >
                Back to products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDetails;

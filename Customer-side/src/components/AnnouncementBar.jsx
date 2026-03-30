import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { FaBullhorn } from 'react-icons/fa';
import api from '../api.js';

const AnnouncementBar = () => {
  const [latestProduct, setLatestProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLatestProduct = async () => {
      try {
        const response = await api.get('/api/products');
        if (response.data.success && response.data.data.length > 0) {
          const sorted = [...response.data.data].sort((a, b) => b.id - a.id);
          setLatestProduct(sorted[0]);
        }
      } catch (err) {
        setError('Unable to load announcement.');
      } finally {
        setLoading(false);
      }
    };

    fetchLatestProduct();
  }, []);

  if (loading || error || !latestProduct) {
    return null;
  }

  return (
    <div className="mx-auto mb-6 max-w-7xl rounded-3xl bg-amber-50 border border-amber-200 px-4 py-4 text-sm text-slate-800 shadow-sm sm:px-6 sm:py-5 sm:text-base">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-rose-500 text-white shadow-sm">
            <FaBullhorn className="h-4 w-4" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-semibold text-slate-900">New arrival:</span>
              <span className="inline-flex items-center gap-2 rounded-full bg-rose-100 px-2.5 py-1 text-xs font-bold uppercase tracking-[0.18em] text-rose-700 animate-pulse">
                NEW
              </span>
            </div>
            <span className="text-slate-700 sm:text-base">{latestProduct.name} is now available.</span>
          </div>
        </div>

        <Link
          to={`/products/${latestProduct.id}`}
          className="inline-flex w-full items-center justify-center rounded-full bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          View product
        </Link>
      </div>
    </div>
  );
};

export default AnnouncementBar;

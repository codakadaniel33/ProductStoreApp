import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../api.js'

const API_BASE = API_URL

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await axios.get(`${API_BASE}/products`)
        setProducts(response.data.data ?? [])
      } catch (err) {
        setError(err.response?.data?.message || 'Could not load products')
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section className="min-h-screen bg-slate-950 text-slate-100 px-4 py-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-700 bg-slate-900/70 p-6 shadow-lg shadow-slate-950/20 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white sm:text-4xl">All Products</h1>
            <p className="mt-2 text-slate-400">Browse every product posted to your store. Each item includes image, name, price, and description.</p>
          </div>
          <div className="rounded-2xl bg-slate-800 px-5 py-4 text-sm text-slate-300">
            {loading ? 'Loading products…' : `${products.length} product${products.length === 1 ? '' : 's'}`}
          </div>
        </div>

        {error ? (
          <div className="rounded-3xl border border-rose-500/50 bg-rose-500/10 px-6 py-5 text-rose-200">{error}</div>
        ) : null}

        {!loading && products.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-900/70 p-10 text-center text-slate-300">
            No products have been posted yet. Add one from the Add Product page.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product, index) => (
              <Link key={`${product.name}-${index}`} to={`/product/${product.id}`} className="group overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 shadow-xl shadow-black/10 transition hover:-translate-y-1 hover:border-sky-500/40 hover:bg-slate-900">
                <article>
                  <div className="h-64 overflow-hidden bg-slate-800">
                    <img
                      src={product.picture}
                      alt={product.name}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-4 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <h2 className="text-xl font-semibold text-white">{product.name}</h2>
                      <span className="rounded-full bg-sky-500/15 px-3 py-1 text-sm font-medium text-sky-300">${product.price}</span>
                    </div>
                    <p className="text-slate-300">{product.description}</p>
                    <div className="text-sm text-slate-400">Click for details</div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Home
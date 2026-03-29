import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api.js'

const API_BASE = API_URL

const DeleteProduct = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [message, setMessage] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true)
      try {
        const response = await axios.get(`${API_BASE}/api/products`)
        const safeProducts = (response.data.data ?? []).map(({ id, ...rest }) => ({
          ...rest,
          productId: id,
        }))
        setProducts(safeProducts)
      } catch {
        setProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  const handleDelete = async (productId) => {
    setMessage('')
    try {
      await axios.delete(`${API_BASE}/api/products/delete/${productId}`)
      setProducts((current) => current.filter((product) => product.productId !== productId))
      setMessage('Product deleted successfully.')
    } catch {
      setMessage('Failed to delete product. Please try again.')
    }
  }

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-semibold text-white">Delete Product</h1>
          <p className="mt-3 text-slate-400">Choose a product from the list below and delete it from the store database.</p>
        </div>

        {message ? <div className="mb-6 rounded-3xl bg-emerald-500/10 px-5 py-4 text-emerald-200">{message}</div> : null}

        {loading ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-10 text-center text-slate-300">Loading products…</div>
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-10 text-center text-slate-300">No products available to delete.</div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {products.map((product) => (
              <div key={product.productId} className="rounded-3xl border border-slate-700 bg-slate-900/80 p-5 shadow-xl shadow-black/20">
                <h2 className="text-lg font-semibold text-white">{product.name}</h2>
                <p className="mt-2 text-slate-300">${product.price}</p>
                <p className="mt-3 text-slate-400 line-clamp-3">{product.description}</p>
                <button
                  type="button"
                  onClick={() => handleDelete(product.productId)}
                  className="mt-5 w-full rounded-full bg-rose-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-rose-400"
                >
                  Delete Product
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default DeleteProduct
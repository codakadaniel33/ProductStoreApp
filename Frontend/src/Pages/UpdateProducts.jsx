import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../api.js'

const API_BASE = API_URL

const UpdateProducts = () => {
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState('')
  const [formData, setFormData] = useState({ name: '', price: '', description: '', picture: '' })
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE}/api/products`)
        const safeProducts = (response.data.data ?? []).map(({ id, ...rest }) => ({
          ...rest,
          productId: id,
        }))
        setProducts(safeProducts)
      } catch {
        setProducts([])
      }
    }

    fetchProducts()
  }, [])

  useEffect(() => {
    if (!selectedProductId) {
      setFormData({ name: '', price: '', description: '', picture: '' })
      return
    }
    const product = products.find((item) => String(item.productId) === selectedProductId)
    if (product) {
      setFormData({
        name: product.name,
        price: product.price,
        description: product.description,
        picture: product.picture,
      })
    }
  }, [selectedProductId, products])

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setStatus('')

    if (!selectedProductId) {
      setError('Please choose a product to update.')
      return
    }

    try {
      await axios.put(`${API_BASE}/api/products/update/${selectedProductId}`, formData)
      setStatus('Product updated successfully.')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product.')
    }
  }

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-semibold text-white">Update Product</h1>
          <p className="mt-3 text-slate-400">Select an existing product and update its name, price, image URL, or description.</p>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-6 shadow-lg shadow-black/20">
          <label className="mb-3 block text-sm font-medium text-slate-200">Choose product</label>
          <select
            value={selectedProductId}
            onChange={(event) => setSelectedProductId(event.target.value)}
            className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
          >
            <option value="">Select a product to update</option>
            {products.map((product) => (
              <option key={product.productId} value={product.productId}>
                {product.name}
              </option>
            ))}
          </select>
        </div>

        {error ? <div className="mb-6 rounded-2xl bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div> : null}
        {status ? <div className="mb-6 rounded-2xl bg-emerald-500/10 px-4 py-3 text-emerald-200">{status}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Product Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product name"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Price</label>
            <input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Image URL</label>
            <input
              name="picture"
              type="url"
              value={formData.picture}
              onChange={handleChange}
              placeholder="https://example.com/product.jpg"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              placeholder="Product description"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>

          <button type="submit" className="w-full rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-400">
            Save changes
          </button>
        </form>
      </div>
    </section>
  )
}

export default UpdateProducts
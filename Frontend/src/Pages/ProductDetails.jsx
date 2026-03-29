import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import { API_URL } from '../api.js'

const API_BASE = API_URL
const WHATSAPP_NUMBER = (import.meta.env.VITE_WHATSAPP_NUMBER ?? '').replace(/\D+/g, '')

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true)
      setError('')

      try {
        const response = await axios.get(`${API_BASE}/api/products/${id}`)
        setProduct(response.data.data)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load product details.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchProduct()
    }
  }, [id])

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <div className="mx-auto max-w-4xl rounded-3xl border border-slate-700 bg-slate-900/80 p-10 text-center text-slate-300 shadow-lg shadow-black/20">
          Loading product details...
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
        <div className="mx-auto max-w-4xl rounded-3xl border border-rose-500/50 bg-rose-500/10 p-10 text-center text-rose-200 shadow-lg shadow-black/20">
          <p>{error}</p>
          <Link to="/" className="mt-6 inline-flex rounded-full bg-slate-800 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
            Back to home
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-6xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl font-semibold text-white">{product?.name}</h1>
            <p className="mt-2 text-slate-400">Detailed view of the selected product.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link to="/" className="inline-flex rounded-full bg-slate-800 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700">
              Back to Home
            </Link>
            <a
              href={
                WHATSAPP_NUMBER
                  ? `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encodeURIComponent(
                      `Hi! I am interested in the product ${product?.name} priced at Tsh ${product?.price}. Can you provide more details?`
                    )}`
                  : undefined
              }
              target="_blank"
              rel="noreferrer noopener"
              onClick={(event) => {
                if (!WHATSAPP_NUMBER) event.preventDefault()
              }}
              className={`inline-flex rounded-full px-5 py-3 text-sm font-semibold text-white transition ${
                WHATSAPP_NUMBER
                  ? 'bg-emerald-500 hover:bg-emerald-400'
                  : 'cursor-not-allowed bg-slate-700 text-slate-400'
              }`}
            >
              {WHATSAPP_NUMBER ? 'Contact on WhatsApp' : 'WhatsApp number not configured'}
            </a>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <div className="overflow-hidden rounded-3xl border border-slate-700 bg-slate-950/80">
            <img src={product?.picture} alt={product?.name} className="h-full w-full object-contain" />
          </div>

          <div className="space-y-6 rounded-3xl border border-slate-700 bg-slate-950/80 p-8">
            <div className="rounded-3xl bg-slate-900/80 p-6 text-slate-200">
              <p className="text-sm uppercase tracking-[0.24em] text-sky-400">Price</p>
              <p className="mt-2 text-3xl font-semibold text-white">Tsh {product?.price}</p>
            </div>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Description</h2>
                <p className="mt-3 leading-7 text-slate-300">{product?.description}</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-[0.24em] text-slate-500">Product type</h3>
                <p className="mt-2 text-slate-300">Standard store item</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails

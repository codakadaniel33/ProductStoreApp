import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'

const AddProduct = () => {
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [description, setDescription] = useState('')
  const [picture, setPicture] = useState('')
  const [pictureName, setPictureName] = useState('')
  const [status, setStatus] = useState('')
  const [error, setError] = useState('')

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]
    if (!file) {
      setPicture('')
      setPictureName('')
      return
    }

    setPictureName(file.name)
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPicture(reader.result)
      }
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setStatus('')
    setError('')

    if (!name || !price || !description || !picture) {
      setError('Please fill in all fields before submitting.')
      return
    }

    try {
      await axios.post(`${API_BASE}/products/create`, {
        name,
        price,
        description,
        picture,
      })
      setStatus('Product added successfully.')
      setName('')
      setPrice('')
      setDescription('')
      setPicture('')
      setPictureName('')
      navigate('/')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product.')
    }
  }

  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-3xl">
        <div className="mb-8 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-semibold text-white">Add Product</h1>
          <p className="mt-3 text-slate-400">Use the form below to submit a new product with image URL, name, price, and description.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-lg shadow-black/20">
          {error ? <div className="rounded-2xl bg-rose-500/10 px-4 py-3 text-rose-200">{error}</div> : null}
          {status ? <div className="rounded-2xl bg-emerald-500/10 px-4 py-3 text-emerald-200">{status}</div> : null}

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Product Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Example: Blue sneaker"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Price</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Example: 49.99"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition file:rounded-full file:border-0 file:bg-slate-800 file:px-4 file:py-2 file:text-slate-100 file:transition file:hover:bg-slate-700"
            />
            {pictureName ? (
              <p className="mt-3 text-sm text-slate-400">Selected file: {pictureName}</p>
            ) : (
              <p className="mt-3 text-sm text-slate-400">Choose an image from your PC; it will be uploaded as product artwork.</p>
            )}
            {picture ? (
              <div className="mt-4 overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80">
                <img src={picture} alt="Preview" className="h-72 w-full object-contain" />
              </div>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-slate-200">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              placeholder="Write a short description for the product."
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition focus:border-sky-500"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-full bg-sky-500 px-6 py-3 text-base font-semibold text-white transition hover:bg-sky-400"
          >
            Create Product
          </button>
        </form>
      </div>
    </section>
  )
}

export default AddProduct
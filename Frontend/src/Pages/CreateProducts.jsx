import { Link } from 'react-router-dom'

const CreateProducts = () => {
  return (
    <section className="min-h-screen bg-slate-950 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-xl shadow-black/20">
          <h1 className="text-3xl font-semibold text-white">Create Products</h1>
          <p className="mt-4 text-slate-400">This page is a quick entry point for adding new products to your store. The Add Product page includes the full form for name, price, image URL, and description.</p>

          <div className="mt-8 rounded-3xl border border-slate-700 bg-slate-950/80 p-6 text-slate-300">
            <h2 className="text-xl font-semibold text-white">Add a new product</h2>
            <p className="mt-2">Fill in every field and submit the product to save it to the backend database.</p>
            <Link
              to="/add"
              className="mt-6 inline-flex rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-400"
            >
              Go to Add Product
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CreateProducts
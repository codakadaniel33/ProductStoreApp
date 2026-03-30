import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section className="space-y-8">
      <div className="rounded-3xl bg-white px-8 py-12 shadow-lg">
        <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">Browse the latest posted products</h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          Discover customer-ready products posted by your team. This site is the customer-facing storefront, so admin tools are intentionally hidden.
        </p>
        <Link
          to="/products"
          className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          View Products
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <article className="rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg">
          <h2 className="text-2xl font-semibold">Customer-first experience</h2>
          <p className="mt-3 text-slate-200">
            The Customer-side app only shows available products and general site pages. There is no admin dashboard here, so other users cannot access admin workflows.
          </p>
        </article>
        <article className="rounded-3xl bg-white px-8 py-10 shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900">Fast product browsing</h2>
          <p className="mt-3 text-slate-600">
            Products are loaded from the backend API and displayed in a clean storefront layout with responsive cards.
          </p>
        </article>
      </div>
    </section>
  );
};

export default Home;
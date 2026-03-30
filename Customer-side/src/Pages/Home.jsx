import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';

const Home = () => {
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="space-y-8">
      <AnnouncementBar />
      <section className="space-y-8">
        <div className="rounded-3xl bg-white px-6 py-10 shadow-lg sm:px-8 sm:py-12">
          <h1 className="text-4xl font-semibold text-slate-900 sm:text-5xl">Welcome to Gifted Services</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
            Discover curated products and gift ideas made for your lifestyle. Gifted Services brings you a warm, effortless shopping experience with helpful product details and fast seller contact.
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
            <Link
              to="/products"
              className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
            >
              Browse products
            </Link>
            <span className="text-sm text-slate-500">See the newest arrivals, popular picks, and customer-ready collections.</span>
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <article
            ref={(el) => (cardRefs.current[0] = el)}
            className="scroll-card scroll-card-left rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold">A thoughtful shopping experience</h2>
            <p className="mt-3 text-slate-200">
              Gifted Services keeps the storefront focused on products you can trust, with clear pricing and easy access to the seller.
            </p>
          </article>
          <article
            ref={(el) => (cardRefs.current[1] = el)}
            className="scroll-card scroll-card-right rounded-3xl bg-white px-8 py-10 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Easy to explore</h2>
            <p className="mt-3 text-slate-600">
              Quickly browse products by category, latest arrivals, and featured offers in a smooth layout designed for customers.
            </p>
          </article>
          <article
            ref={(el) => (cardRefs.current[2] = el)}
            className="scroll-card scroll-card-left rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold">Fresh product highlights</h2>
            <p className="mt-3 text-slate-200">
              Stay inspired with new arrivals and curated gift ideas that are updated often for your convenience.
            </p>
          </article>
          <article
            ref={(el) => (cardRefs.current[3] = el)}
            className="scroll-card scroll-card-right rounded-3xl bg-white px-8 py-10 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Direct seller support</h2>
            <p className="mt-3 text-slate-600">
              Need help choosing the right item? Contact the admin directly from the product page and get a fast response.
            </p>
          </article>
        </div>
      </section>
  </div>
  );
};

export default Home;
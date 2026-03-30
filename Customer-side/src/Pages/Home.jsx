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
            Explore our latest arrivals and discover high-quality products selected just for you. Gifted Services makes it easy to find what you need with a clean, friendly shopping experience.
          </p>
          <Link
            to="/products"
            className="inline-flex rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
          >
            Browse products
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <article
            ref={(el) => (cardRefs.current[0] = el)}
            className="scroll-card scroll-card-left rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold">A thoughtful shopping experience</h2>
            <p className="mt-3 text-slate-200">
              Gifted Services brings you a clean storefront with only what matters most: fresh products, clear details, and a seamless way to connect with the seller.
            </p>
          </article>
          <article
            ref={(el) => (cardRefs.current[1] = el)}
            className="scroll-card scroll-card-right rounded-3xl bg-white px-8 py-10 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Easy to explore</h2>
            <p className="mt-3 text-slate-600">
              Find products quickly, view the latest offers, and reach out to the seller with a single click. Everything is built to feel simple and customer-first.
            </p>
          </article>
        </div>
      </section>
  </div>
  );
};

export default Home;
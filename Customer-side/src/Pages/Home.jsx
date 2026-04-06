import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import AnnouncementBar from '../components/AnnouncementBar';

const Home = () => {
  const cardRefs = useRef([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slideshowCards = [
    {
      title: "Why Choose Us?",
      description: "We curate only the best products with verified sellers, ensuring quality and trust in every purchase.",
      bgColor: "bg-gradient-to-r from-purple-600 to-blue-600",
      textColor: "text-white"
    },
    {
      title: "Quality Guaranteed",
      description: "Every product is carefully selected and verified for quality, giving you peace of mind with every order.",
      bgColor: "bg-gradient-to-r from-green-600 to-teal-600",
      textColor: "text-white"
    },
    {
      title: "Fast Customer Support",
      description: "Get instant help from our dedicated support team. We're here to make your shopping experience smooth.",
      bgColor: "bg-gradient-to-r from-orange-600 to-red-600",
      textColor: "text-white"
    },
    {
      title: "Secure Payments",
      description: "Shop with confidence using our secure payment gateway. Your transactions are always protected.",
      bgColor: "bg-gradient-to-r from-indigo-600 to-purple-600",
      textColor: "text-white"
    },
    {
      title: "Fast Delivery",
      description: "Quick and reliable delivery service to get your products to you in record time.",
      bgColor: "bg-gradient-to-r from-pink-600 to-rose-600",
      textColor: "text-white"
    },
    {
      title: "Easy Returns",
      description: "Hassle-free return policy. If you're not satisfied, we'll make it right.",
      bgColor: "bg-gradient-to-r from-cyan-600 to-blue-600",
      textColor: "text-white"
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideshowCards.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [slideshowCards.length]);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-blue-100/20 to-purple-100/20 pointer-events-none"></div>
      <div className="relative space-y-8">
        <AnnouncementBar />
        <section className="space-y-8">
          <div className="rounded-3xl bg-gradient-to-r from-white/90 to-white/70 backdrop-blur-sm px-6 py-10 shadow-xl sm:px-8 sm:py-12 border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-purple-600/5 rounded-3xl"></div>
            <div className="relative">
              <h1 className="text-4xl font-semibold bg-gradient-to-r from-slate-900 via-blue-800 to-purple-800 bg-clip-text text-transparent sm:text-5xl">Welcome to Gifted Services</h1>
              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Discover curated products and gift ideas made for your lifestyle. Gifted Services brings you a warm, effortless shopping experience with helpful product details and fast seller contact.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
                <Link
                  to="/products"
                  className="inline-flex rounded-full bg-gradient-to-r from-slate-900 to-blue-800 px-6 py-3 text-sm font-semibold text-white transition-all hover:from-slate-800 hover:to-blue-700 hover:shadow-lg hover:scale-105"
                >
                  Browse products
                </Link>
                <span className="text-sm text-slate-500">See the newest arrivals, popular picks, and customer-ready collections.</span>
              </div>
            </div>
          </div>

          {/* Animated Slideshow Section */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-slate-100/80 to-white/80 backdrop-blur-sm p-8 shadow-xl border border-white/20">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-3xl"></div>
            <div className="relative flex animate-slide-right">
              {slideshowCards.map((card, index) => (
                <div
                  key={index}
                  className={`flex-shrink-0 w-80 mx-4 rounded-2xl ${card.bgColor} p-6 transform transition-all duration-500 hover:scale-105 shadow-xl backdrop-blur-sm border border-white/10`}
                >
                  <h3 className={`text-xl font-bold ${card.textColor} mb-3`}>
                    {card.title}
                  </h3>
                  <p className={`${card.textColor} opacity-90 leading-relaxed`}>
                    {card.description}
                  </p>
                </div>
              ))}
              {/* Duplicate cards for seamless loop */}
              {slideshowCards.map((card, index) => (
                <div
                  key={`duplicate-${index}`}
                  className={`flex-shrink-0 w-80 mx-4 rounded-2xl ${card.bgColor} p-6 transform transition-all duration-500 hover:scale-105 shadow-xl backdrop-blur-sm border border-white/10`}
                >
                  <h3 className={`text-xl font-bold ${card.textColor} mb-3`}>
                    {card.title}
                  </h3>
                  <p className={`${card.textColor} opacity-90 leading-relaxed`}>
                    {card.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            <article
              ref={(el) => (cardRefs.current[0] = el)}
              className="scroll-card scroll-card-left rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl border border-slate-700/50"
            >
              <h2 className="text-2xl font-semibold">A thoughtful shopping experience</h2>
              <p className="mt-3 text-slate-200">
                Gifted Services keeps the storefront focused on products you can trust, with clear pricing and easy access to the seller.
              </p>
            </article>
            <article
              ref={(el) => (cardRefs.current[1] = el)}
              className="scroll-card scroll-card-right rounded-3xl bg-gradient-to-br from-white to-slate-50 px-8 py-10 shadow-xl border border-slate-200/50"
            >
              <h2 className="text-2xl font-semibold text-slate-900">Easy to explore</h2>
              <p className="mt-3 text-slate-600">
                Quickly browse products by category, latest arrivals, and featured offers in a smooth layout designed for customers.
              </p>
            </article>
            <article
              ref={(el) => (cardRefs.current[2] = el)}
              className="scroll-card scroll-card-left rounded-3xl bg-gradient-to-br from-slate-900 to-slate-800 px-8 py-10 text-white shadow-xl border border-slate-700/50"
            >
              <h2 className="text-2xl font-semibold">Fresh product highlights</h2>
              <p className="mt-3 text-slate-200">
                Stay inspired with new arrivals and curated gift ideas that are updated often for your convenience.
              </p>
            </article>
            <article
              ref={(el) => (cardRefs.current[3] = el)}
              className="scroll-card scroll-card-right rounded-3xl bg-gradient-to-br from-white to-slate-50 px-8 py-10 shadow-xl border border-slate-200/50"
            >
              <h2 className="text-2xl font-semibold text-slate-900">Direct seller support</h2>
              <p className="mt-3 text-slate-600">
                Need help choosing the right item? Contact the admin directly from the product page and get a fast response.
              </p>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
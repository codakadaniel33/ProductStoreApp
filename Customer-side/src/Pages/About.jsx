import React, { useEffect, useRef } from 'react'
import { FaTiktok, FaInstagram } from 'react-icons/fa'
import Footer from '../components/Footer'

const About = () => {
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
      { threshold: 0.25 }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className="space-y-10">
        <div className="rounded-3xl bg-white px-8 py-12 shadow-lg">
          <h1 className="text-3xl font-semibold text-slate-900">About Gifted Services</h1>
          <p className="mt-4 text-slate-600 leading-8">
            Gifted Services is your customer-friendly marketplace for discovering great products with ease. We focus on making your shopping journey smooth, welcoming, and straightforward.
          </p>
          <p className="mt-4 text-slate-600 leading-8">
            Browse fresh listings, learn about featured items, and contact the seller directly when you're ready. This storefront keeps the experience simple and centered on you.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <article
            ref={(el) => (cardRefs.current[0] = el)}
            className="scroll-card scroll-card-left rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold">Trusted selections</h2>
            <p className="mt-3 text-slate-200">
              Every product is displayed clearly so you can shop with confidence and find something perfect.
            </p>
          </article>
          <article
            ref={(el) => (cardRefs.current[1] = el)}
            className="scroll-card scroll-card-right rounded-3xl bg-white px-8 py-10 shadow-lg"
          >
            <h2 className="text-2xl font-semibold text-slate-900">Customer convenience</h2>
            <p className="mt-3 text-slate-600">
              Gifted Services is designed to make browsing easy, with straightforward product details and smart page flow.
            </p>
          </article>
          <article
            ref={(el) => (cardRefs.current[2] = el)}
            className="scroll-card scroll-card-left rounded-3xl bg-slate-900 px-8 py-10 text-white shadow-lg"
          >
            <h2 className="text-2xl font-semibold">Friendly support</h2>
            <p className="mt-3 text-slate-200">
              Reach out directly to the seller via WhatsApp and get fast, personal assistance for every product.
            </p>
          </article>
        </div>

        {/* Social Media Section */}
        <div 
          ref={(el) => (cardRefs.current[3] = el)}
          className="scroll-card scroll-card-up rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900 px-8 py-12 shadow-xl border border-white/10"
        >
          <h2 className="text-3xl font-semibold text-white text-center mb-8">Follow Us</h2>
          <p className="text-center text-slate-200 mb-10 max-w-2xl mx-auto">
            Stay connected with us on social media for the latest updates, new product arrivals, and exclusive offers.
          </p>
          <div className="flex justify-center items-center gap-8">
            {/* TikTok */}
            <a
              href="https://vm.tiktok.com/ZS98gy6QF6HNP-pjlc3/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-black to-gray-800 group-hover:from-black group-hover:to-gray-700 transition-colors">
                <FaTiktok className="w-8 h-8 text-white" />
              </div>
              <span className="text-white font-medium">TikTok</span>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/michy_de_perfume?utm_source=qr&igsh=Y3dxZ2xmNDkyemh0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105"
            >
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 group-hover:from-purple-500 group-hover:via-pink-500 group-hover:to-orange-500 transition-all duration-300">
                <FaInstagram className="w-8 h-8 text-white" />
              </div>
              <span className="text-white font-medium">Instagram</span>
            </a>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About
import React, { useEffect, useRef } from 'react'

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
    </section>
  );
}

export default About
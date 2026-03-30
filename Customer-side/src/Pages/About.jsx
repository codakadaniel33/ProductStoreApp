import React from 'react'

const About = () => {
  return (
    <section className="space-y-6 rounded-3xl bg-white px-8 py-12 shadow-lg">
      <h1 className="text-3xl font-semibold text-slate-900">About the Customer Store</h1>
      <p className="text-slate-600 leading-8">
        This customer-facing app is designed to display posted products without exposing the admin interface. It keeps the storefront clean and focused on shopping.
      </p>
      <p className="text-slate-600 leading-8">
        The layout uses Tailwind CSS for responsive styling and React Router for smooth page navigation.
      </p>
    </section>
  );
}

export default About
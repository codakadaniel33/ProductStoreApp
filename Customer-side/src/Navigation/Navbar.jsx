import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-blue-200 border-b-2 border-blue-300 pb-1 transition'
      : 'text-white hover:text-blue-200 transition';

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-slate-900/95 to-blue-900/95 backdrop-blur-md shadow-lg border-b border-white/10">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-3 text-xl font-semibold text-white hover:text-blue-200 transition-colors">
          <FaBoxOpen className="h-6 w-6 text-blue-300" />
          Product Store
        </NavLink>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>

        <nav className="hidden items-center gap-6 text-base font-medium sm:flex">
          <NavLink to="/" className={linkClass} end>
            <div className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
              <FaHome />
              Home
            </div>
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            <div className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
              <FaBoxOpen />
              Products
            </div>
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            <div className="flex items-center gap-2 text-white hover:text-blue-200 transition-colors">
              <FaInfoCircle />
              About
            </div>
          </NavLink>
        </nav>
      </div>

      {menuOpen ? (
        <div className="border-t border-white/10 bg-gradient-to-r from-slate-900/95 to-blue-900/95 backdrop-blur-md px-4 pb-4 sm:hidden">
          <nav className="flex flex-col gap-2 py-3 text-base font-medium">
            <NavLink
              to="/"
              className="block rounded-2xl px-4 py-3 text-white hover:bg-white/10 transition-colors"
              end
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="block rounded-2xl px-4 py-3 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className="block rounded-2xl px-4 py-3 text-white hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              About
            </NavLink>
          </nav>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
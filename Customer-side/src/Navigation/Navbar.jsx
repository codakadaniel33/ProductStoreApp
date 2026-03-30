import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FaBars, FaTimes, FaHome, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const linkClass = ({ isActive }) =>
    isActive
      ? 'text-slate-900 border-b-2 border-slate-900 pb-1 transition'
      : 'text-slate-600 hover:text-slate-900 transition';

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto flex flex-wrap items-center justify-between px-4 py-4">
        <NavLink to="/" className="flex items-center gap-3 text-xl font-semibold text-slate-900">
          <FaBoxOpen className="h-6 w-6 text-slate-800" />
          Product Store
        </NavLink>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 text-slate-700 hover:bg-slate-100 sm:hidden"
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation menu"
        >
          {menuOpen ? <FaTimes className="h-5 w-5" /> : <FaBars className="h-5 w-5" />}
        </button>

        <nav className="hidden items-center gap-6 text-base font-medium sm:flex">
          <NavLink to="/" className={linkClass} end>
            <div className="flex items-center gap-2">
              <FaHome />
              Home
            </div>
          </NavLink>
          <NavLink to="/products" className={linkClass}>
            <div className="flex items-center gap-2">
              <FaBoxOpen />
              Products
            </div>
          </NavLink>
          <NavLink to="/about" className={linkClass}>
            <div className="flex items-center gap-2">
              <FaInfoCircle />
              About
            </div>
          </NavLink>
        </nav>
      </div>

      {menuOpen ? (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 sm:hidden">
          <nav className="flex flex-col gap-2 py-3 text-base font-medium">
            <NavLink
              to="/"
              className="block rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
              end
              onClick={() => setMenuOpen(false)}
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className="block rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
              onClick={() => setMenuOpen(false)}
            >
              Products
            </NavLink>
            <NavLink
              to="/about"
              className="block rounded-2xl px-4 py-3 text-slate-700 transition hover:bg-slate-100"
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
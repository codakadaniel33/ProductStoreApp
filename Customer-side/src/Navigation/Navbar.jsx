import { NavLink } from 'react-router-dom';
import { FaHome, FaBoxOpen, FaInfoCircle } from 'react-icons/fa';

const Navbar = () => {
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

        <nav className="flex items-center gap-6 text-base font-medium">
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
    </header>
  );
};

export default Navbar;
import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineEdit, AiOutlineDelete, AiOutlineFolderAdd } from 'react-icons/ai'
import { BiStoreAlt } from 'react-icons/bi'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import '../App.css'

const navLinks = [
  { to: '/', label: 'Home', Icon: AiOutlineHome },
  { to: '/create', label: 'Create', Icon: AiOutlinePlusCircle },
  { to: '/update', label: 'Update', Icon: AiOutlineEdit },
  { to: '/delete', label: 'Delete', Icon: AiOutlineDelete },
  { to: '/add', label: 'Add', Icon: AiOutlineFolderAdd },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-slate-900 text-slate-100 shadow-sm sticky top-0 z-20">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold text-white hover:text-sky-300">
          <BiStoreAlt className="h-7 w-7" />
          <span>Product Store</span>
        </NavLink>

        <button
          type="button"
          aria-controls="primary-navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
          className="inline-flex items-center justify-center rounded-full border border-slate-700 bg-slate-800 p-2 text-slate-100 transition hover:bg-slate-700 sm:hidden"
        >
          <span className="sr-only">{menuOpen ? 'Close navigation' : 'Open navigation'}</span>
          {menuOpen ? <HiOutlineX className="h-6 w-6" /> : <HiOutlineMenu className="h-6 w-6" />}
        </button>

        <nav
          id="primary-navigation"
          className={`w-full flex-col gap-2 text-sm font-medium sm:flex sm:w-auto ${menuOpen ? 'flex' : 'hidden'}`}
        >
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 rounded-full px-3 py-2 transition-colors duration-200 ${
                  isActive
                    ? 'bg-sky-500 text-white shadow-lg shadow-sky-500/20'
                    : 'text-slate-200 hover:bg-slate-800 hover:text-white'
                }`
              }
            >
              <Icon className="h-5 w-5" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  )
}

export default Navbar
import React from 'react'
import { NavLink } from 'react-router-dom'
import { AiOutlineHome, AiOutlinePlusCircle, AiOutlineEdit, AiOutlineDelete, AiOutlineFolderAdd } from 'react-icons/ai'
import { BiStoreAlt } from 'react-icons/bi'
import '../App.css'

const navLinks = [
  { to: '/', label: 'Home', Icon: AiOutlineHome },
  { to: '/create', label: 'Create', Icon: AiOutlinePlusCircle },
  { to: '/update', label: 'Update', Icon: AiOutlineEdit },
  { to: '/delete', label: 'Delete', Icon: AiOutlineDelete },
  { to: '/add', label: 'Add', Icon: AiOutlineFolderAdd },
]

const Navbar = () => {
  return (
    <header className="bg-slate-900 text-slate-100 shadow-sm sticky top-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NavLink to="/" className="flex items-center gap-2 text-xl font-semibold text-white hover:text-sky-300">
          <BiStoreAlt className="h-7 w-7" />
          <span>Product Store</span>
        </NavLink>

        <nav className="flex flex-wrap items-center gap-2 text-sm font-medium">
          {navLinks.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
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
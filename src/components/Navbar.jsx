import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import { navLinks } from '../data/navLinks'
import useCartStore from '../store/cartStore'

export default function Navbar() {
  const { items, getTotal } = useCartStore()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className=" bg-base-100 shadow-sm text-gray-100 fixed top-0 left-0 w-full">
      <div className="navbar container mx-auto ">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            {navLinks.map(link => (
              <li key={link.to} className={link.enabled ? '' : 'hidden'}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <Link to="/" className="btn btn-ghost text-xl">ASTER Multiseat Nepal</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-lg menu-horizontal px-1">
          {navLinks.map(link => (
            <li key={link.to} className={link.enabled ? '' : 'hidden'}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="badge badge-sm indicator-item">{itemCount}</span>
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-6 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">{itemCount} Items</span>
              <span className="text-info">Subtotal: ${getTotal().toFixed(2)}</span>
              <div className="card-actions">
                <Link to="/cart" className="btn btn-primary btn-block">View cart</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

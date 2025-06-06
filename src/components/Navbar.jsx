import React from 'react'
import { Link } from 'react-router-dom'
import { ShoppingCart } from 'lucide-react'
import useCartStore from '../store/cartStore'

export default function Navbar() {
  const { items, getTotal } = useCartStore()
  const itemCount = items.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="navbar bg-base-100 shadow-sm">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
            <li><Link to="/rabistha/">Home</Link></li>
            <li><Link to="/rabistha/features">Features</Link></li>
            <li><Link to="/rabistha/purchase">Purchase</Link></li>
            <li><Link to="/rabistha/faqs">FAQs</Link></li>
            <li><Link to="/rabistha/contact">Contact</Link></li>
            <li><Link to="/rabistha/wiki">Wiki</Link></li>
            <li><Link to="/rabistha/blog">Blog</Link></li>
            <li><Link to="/rabistha/news">News</Link></li>
          </ul>
        </div>
        <Link to="/rabistha/" className="btn btn-ghost text-xl">ASTER Multiseat Nepal</Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/rabistha/">Home</Link></li>
          <li><Link to="/rabistha/features">Features</Link></li>
          <li><Link to="/rabistha/purchase">Purchase</Link></li>
          <li><Link to="/rabistha/faqs">FAQs</Link></li>
          <li><Link to="/rabistha/contact">Contact</Link></li>
          <li><Link to="/rabistha/wiki">Wiki</Link></li>
          <li><Link to="/rabistha/blog">Blog</Link></li>
          <li><Link to="/rabistha/news">News</Link></li>
        </ul>
      </div>
      <div className="navbar-end">
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
            <div className="indicator">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="badge badge-sm indicator-item">{itemCount}</span>
              )}
            </div>
          </div>
          <div
            tabIndex={0}
            className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow">
            <div className="card-body">
              <span className="text-lg font-bold">{itemCount} Items</span>
              <span className="text-info">Subtotal: ${getTotal().toFixed(2)}</span>
              <div className="card-actions">
                <Link to="/rabistha/cart" className="btn btn-primary btn-block">View cart</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

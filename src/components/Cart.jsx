import { ShoppingCart, Trash2, Plus, Minus } from 'lucide-react'
import useCartStore from '../store/cartStore'
import { useState } from 'react'
import ShippingDetailsForm from './ShippingDetailsForm'

export default function Cart() {
  const { items, removeItem, updateQuantity, getTotal } = useCartStore()
 
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-base-200 rounded-lg">
        <ShoppingCart className="w-12 h-12 text-gray-400" />
        <p className="mt-4 text-gray-500">Your cart is empty</p>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="my-6 md:flex md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800 capitalize lg:text-3xl dark:text-white">
              Order Details
            </h1>
            <div className="flex mx-auto mt-6">
              <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
              <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Shopping Cart</h2>
              <span className="text-lg font-medium">${getTotal().toFixed(2)}</span>
            </div>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 bg-base-200 rounded-lg">
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-base-300 rounded">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-base-300 rounded">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Shipping Details Form */}
          <ShippingDetailsForm />
        </div>
        <div className="mt-8 flex justify-end">
          <button className="btn btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
} 
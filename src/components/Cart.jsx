import { Minus, Plus, ShoppingCart, Trash2 } from 'lucide-react'
import { useState } from 'react'
import useCartStore from '../store/cartStore'
import { DiscountForm } from "./DiscountForm"
import ShippingDetailsForm from './ShippingDetailsForm'

export default function Cart() {
  const { items, removeItem, updateQuantity, getSubtotal, getDiscountAmount, setDiscount, clearDiscount, discount } = useCartStore()
  const [showDiscount, setShowDiscount] = useState(false)

  const calculateFinalTotal = () => {
    const subtotal = getSubtotal()
    const discountAmount = discount ? getDiscountAmount() : 0
    return subtotal - discountAmount
  }

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
              <h2 className="text-xl font-semibold">Cart</h2>
              <span className="text-lg font-medium">${calculateFinalTotal().toFixed(2)}</span>
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
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 hover:bg-base-300 rounded">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button type="button" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 hover:bg-base-300 rounded">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                    <button type="button" onClick={() => removeItem(item.id)} className="p-2 text-red-500 hover:bg-red-100 rounded">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            {/* Discount Section */}
            <div className="mt-6">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="applyDiscount"
                  checked={showDiscount}
                  onChange={(e) => setShowDiscount(e.target.checked)}
                  className="checkbox checkbox-primary"
                />
                <label htmlFor="applyDiscount" className="text-sm font-medium">
                  I have a discount coupon
                </label>
              </div>
              {showDiscount && (
                <DiscountForm
                  onApply={() => setDiscount(true)}
                  onRemove={() => {
                    setDiscount(false)
                    clearDiscount()
                  }}
                  isApplied={discount}
                />
              )}
            </div>
            {/* Order Summary */}
            <div className="mt-6 p-4 bg-base-200 rounded-lg space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${getSubtotal().toFixed(2)}</span>
              </div>
              {discount && (
                <div className="flex justify-between text-green-600">
                  <span>Discount (20%)</span>
                  <span>-${getDiscountAmount().toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${calculateFinalTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          {/* Shipping Details Form */}
          <ShippingDetailsForm />
        </div>
        <div className="mt-8 flex justify-end">
          <button type="button" className="btn btn-primary">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  )
} 
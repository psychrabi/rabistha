import { Tag } from 'lucide-react'
import { useState } from 'react'

export const DiscountForm = ({ onApply, isApplied, setIsApplied }) => {
  const [couponCode, setCouponCode] = useState('')
  const [isValid, setIsValid] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()

    // Mock validation - replace with actual coupon validation logic
    if (couponCode.length < 4) {
      setIsValid(false)
      return
    }
    setIsValid(true)

    onApply(couponCode)
  }

  const handleRemove = () => {
    setCouponCode('')
    setIsApplied(false)
    onApplyDiscount(null)
  }

  return (
    <div className="mt-4 p-4 bg-gray-800 rounded-lg">
      {!isApplied ? (
        <form onSubmit={handleSubmit} className="space-y-2">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-gray-500" />
            <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter coupon code"
              className={`flex-1 px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${!isValid ? 'border-red-500' : ''}`} />
            <button type="submit" className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >
              Apply
            </button>
          </div>
          {!isValid && (
            <p className="text-sm text-red-500">Please enter a valid coupon code</p>
          )}
        </form>
      ) : (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Tag className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">{couponCode}</span>
            <span className="text-xs text-green-500">Applied</span>
          </div>
          <button type="button" onClick={handleRemove} className="text-sm text-red-500 hover:text-red-600" >
            Remove
          </button>
        </div>
      )}
    </div>
  )
}
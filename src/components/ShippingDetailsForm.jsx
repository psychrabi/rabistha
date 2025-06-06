import React, { useState } from 'react'

export default function ShippingDetailsForm() {

  const [shippingDetails, setShippingDetails] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    phone: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setShippingDetails(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <div className="bg-base-200 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="hidden text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={shippingDetails.fullName}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="Full name"
            />
          </div>
          <div>
            <label className="hidden text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={shippingDetails.email}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="Email address"
            />
          </div>
        </div>
        <div>
          <label className="hidden text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={shippingDetails.address}
            onChange={handleInputChange}
            className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            required
            placeholder="Address"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="hidden text-sm font-medium mb-1">City</label>
            <input
              type="text"
              name="city"
              value={shippingDetails.city}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="City"
            />
          </div>
          <div>
            <label className="hidden text-sm font-medium mb-1">State</label>
            <input
              type="text"
              name="state"
              value={shippingDetails.state}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="State"
            />
          </div>
          <div>
            <label className="hidden text-sm font-medium mb-1">ZIP Code</label>
            <input value={shippingDetails.zipCode} onChange={handleInputChange} className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="text" placeholder="Zip Code" aria-label="zipCode" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="hidden text-sm font-medium mb-1">Country</label>
            <input
              type="text"
              name="country"
              value={shippingDetails.country}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="Country"
            />
          </div>
          <div>
            <label className="hidden text-sm font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={shippingDetails.phone}
              onChange={handleInputChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
              required
              placeholder="Phone"
            />
          </div>
        </div>
      </form>
    </div>
  )
}

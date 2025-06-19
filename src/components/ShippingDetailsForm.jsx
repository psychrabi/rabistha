import { useForm } from 'react-hook-form'
import useCartStore from '../store/cartStore'
import { useNavigate } from 'react-router-dom'

const ShippingDetailsForm = () => {
  const { items, getSubtotal, getDiscountAmount, discount } = useCartStore()
  const navigate = useNavigate()
  const { register, handleSubmit } = useForm({
    defaultValues: {
      name: '',
      email: '',
      contact: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: ''
    }
  })

  const onSubmit = async (data) => {
    console.log({ "onsubmit": data })
    if (!data) {
      alert('Please fill in shipping details first')
      return
    }

    const subtotal = getSubtotal()
    const discountAmount = discount ? getDiscountAmount() : 0
    const total = subtotal - discountAmount
    const orderDetails = {
      items,
      subtotal: subtotal,
      discount: discountAmount,
      total: total,
      user: data
    }
    console.log(orderDetails)

    navigate('/checkout', { state: orderDetails })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Shipping Details</h2>

      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
        <input
          type="text"
          id="name"
          {...register('name', { required: 'Name is required' })}
          className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
        <input
          type="email"
          id="email"
          {...register('email', { required: 'Email is required' })}
          className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label htmlFor="contact" className="block text-sm font-medium mb-1">Phone</label>
        <input
          {...register('contact', { required: 'Contact number is required' })}
          className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-1">Address</label>
        <input
          type="text"
          id="address"
          {...register('address', { required: 'Address is required' })}
          className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="city" className="block text-sm font-medium mb-1">City</label>
          <input
            type="text"
            id="city"
            {...register('city', { required: 'City is required' })}
            className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="state" className="block text-sm font-medium mb-1">State</label>
          <input
            type="text"
            id="state"
            {...register('state', { required: 'State is required' })}
            className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label htmlFor="zipCode" className="block text-sm font-medium mb-1">ZIP Code</label>
          <input
            type="text"
            id="zipCode"
            {...register('zipCode', { required: 'Zip Code is required' })}
            className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>

        <div>
          <label htmlFor="country" className="block text-sm font-medium mb-1">Country</label>
          <input
            type="text"
            id="country"
            {...register('country', { required: 'Country is required' })}
            className="block w-full px-4 py-2 mt-2 text-gray-700 dark:text-gray-100 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
        </div>
      </div>

      <button
        type="submit"
        className="btn btn-primary w-full  rounded-lg"
      >
        Proceed to Checkout
      </button>
    </form>
  )
}

export default ShippingDetailsForm

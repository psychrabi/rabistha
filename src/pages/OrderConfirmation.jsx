import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const OrderConfirmation = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get the latest order from localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    if (orders.length > 0) {
      setOrder(orders[orders.length - 1]);
    }
  }, []);

  if (!order) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>Loading order details...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
        <p className="text-gray-600 dark:text-gray-100">Thank you for your purchase</p>
      </div>

      <div className=" rounded-lg shadow p-6 mb-6">
        <h2 className="text-xl font-semibold mb-4">Order Details</h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-100">Order ID:</span>
            <span className="font-medium">{order.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-100">Payment Method:</span>
            <span className="font-medium capitalize">{order.paymentMethod}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-100">Subtotal:</span>
            <span className="font-medium">${order.subtotal.toFixed(2)}</span>
          </div>
          {order.discount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Discount:</span>
              <span>-${order.discount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t pt-4 mt-4">
            <div className="flex justify-between font-semibold">
              <span>Total:</span>
              <span>${order.total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={() => navigate('/rabistha/')}
          className="btn btn-primary"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmation; 
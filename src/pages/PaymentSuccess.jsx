import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import useCartStore from '../store/cartStore';
import { useAdminStore } from '../store/adminStore';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const {licenses} = useAdminStore()
 

  useEffect(() => {
    const orderId = new URLSearchParams(location.search).get('orderId');
    if (!orderId) {
      navigate('/cart');
      return;
    }

    // Try to get order details from currentOrder in localStorage first
    const currentOrder = JSON.parse(localStorage.getItem('currentOrder') || 'null');
    
    if (currentOrder && currentOrder.id === orderId) {
      // Update order status
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const updatedOrders = orders.map(o => {
        if (o.id === orderId) {
          return { ...o, paymentStatus: 'completed' };
        }
        return o;
      });
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      
      // Remove currentOrder from localStorage
      localStorage.removeItem('currentOrder');
      
      setOrderDetails({ ...currentOrder, paymentStatus: 'completed' });

      // Update licenses status to sold
      const licenses = JSON.parse(localStorage.getItem('licenses') || '[]');
      const orderLicenses = licenses.filter(l => l.orderId === orderId);
      
      if (orderLicenses.length > 0) {
        const updatedLicenses = licenses.map(license => {
          if (license.orderId === orderId) {
            return { ...license, status: 'sold' };
          }
          return license;
        });
        localStorage.setItem('licenses', JSON.stringify(updatedLicenses));
        setPurchasedLicenses(orderLicenses.map(l => ({ ...l, status: 'sold' })));
      }
    } else {
      // Fallback to getting order from orders list
      const orders = JSON.parse(localStorage.getItem('orders') || '[]');
      const order = orders.find(o => o.id === orderId);
      
      if (!order) {
        navigate('/cart');
        return;
      }

      // Update order status
      const updatedOrders = orders.map(o => {
        if (o.id === orderId) {
          return { ...o, paymentStatus: 'completed' };
        }
        return o;
      });
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
      setOrderDetails({ ...order, paymentStatus: 'completed' });

      // Update licenses status to sold
      const licenses = JSON.parse(localStorage.getItem('licenses') || '[]');
      const orderLicenses = licenses.filter(l => l.orderId === orderId);
      
      if (orderLicenses.length > 0) {
        const updatedLicenses = licenses.map(license => {
          if (license.orderId === orderId) {
            return { ...license, status: 'sold' };
          }
          return license;
        });
        localStorage.setItem('licenses', JSON.stringify(updatedLicenses));
        setPurchasedLicenses(orderLicenses.map(l => ({ ...l, status: 'sold' })));
      }
    }
  }, [location.search, navigate]);

  if (!orderDetails) return null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600">Thank you for your purchase</p>
      </div>

      <div className="space-y-6">
        {/* Order Details */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Order Details</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Order ID</span>
              <span className="font-medium">{orderDetails.id}</span>
            </div>
            <div className="flex justify-between">
              <span>Payment Status</span>
              <span className="text-green-600 capitalize">{orderDetails.paymentStatus}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${orderDetails.subtotal.toFixed(2)}</span>
            </div>
            {orderDetails.discount > 0 && (
              <div className="flex justify-between text-green-600">
                <span>Discount</span>
                <span>-${orderDetails.discount.toFixed(2)}</span>
              </div>
            )}
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Licenses */}
        {purchasedLicenses.length > 0 && (
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Purchased Licenses ({purchasedLicenses.length})
            </h3>
            <div className="space-y-4">
              {purchasedLicenses.map((license, index) => (
                <div key={license.key} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">License #{index + 1}</span>
                    <span className="text-green-600 capitalize">{license.status}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600">License Key</span>
                      <span className="font-mono">{license.key}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Valid Until</span>
                      <span>{new Date(license.validUntil).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Return to Home
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess; 
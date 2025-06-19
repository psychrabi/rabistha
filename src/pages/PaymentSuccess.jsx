import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
 
  

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
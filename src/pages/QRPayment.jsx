import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const QRPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState(null);
  const [licenseDetails, setLicenseDetails] = useState(null);

  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
      return;
    }

    // Store order details in localStorage for mobile access
    localStorage.setItem('currentOrder', JSON.stringify(location.state));
    setOrderDetails(location.state);

    // Get license details from localStorage
    const licenses = JSON.parse(localStorage.getItem('licenses') || '[]');
    const license = licenses.find(l => l.orderId === location.state.id);
    setLicenseDetails(license);
  }, [location.state, navigate]);

  if (!orderDetails) return null;

  const paymentUrl = `${window.location.origin}/payment-success?orderId=${orderDetails.id}`;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">QR Payment</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4">Scan QR Code to Pay</h3>
          <div className="flex justify-center">
            <QRCodeSVG 
              value={paymentUrl}
              size={256}
            />
          </div>
          <p className="text-center mt-4 text-gray-600">
            Scan this QR code with your payment app
          </p>
          <p className="text-center mt-2 text-sm text-gray-500">
            Order ID: {orderDetails.id}
          </p>
        </div>

        {/* Order and License Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-medium">{orderDetails.id}</span>
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

          {/* License Details */}
          {licenseDetails && (
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">License Details</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>License Key</span>
                  <span className="font-mono">{licenseDetails.key}</span>
                </div>
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="capitalize">{licenseDetails.status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Valid Until</span>
                  <span>{new Date(licenseDetails.validUntil).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <p className="text-lg font-semibold mb-6">
        Total: ${location.state.total.toFixed(2)}
      </p>
      <button
        onClick={() => navigate(`/payment-success?orderId=${location.state.id}`)}
        className="btn btn-primary w-full"
      >
        I've Completed the Payment
      </button>
    </div>
  );
};

export default QRPayment; 
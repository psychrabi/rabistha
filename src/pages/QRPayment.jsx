import { QRCodeSVG } from 'qrcode.react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const QRPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails, sales } = location.state || {};
  
  // Add missing state variables
  const [purchasedLicenses, setPurchasedLicenses] = useState([]);
  const [showLicenseList, setShowLicenseList] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
      return;
    }
  }, [location.state, navigate]);

  if (!orderDetails) return null;

  const handlePaymentSuccess = async () => {
  setIsProcessing(true);
  try {
    // 1. For each item, fetch available licenses
    let allLicenses = [];

    for (const item of orderDetails.items) {
      const res = await fetch(
        `http://localhost:4000/api/licenses?status=available&type=${encodeURIComponent(item.type)}&quantity=${item.quantity}`,
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`API error: ${res.status} - ${text}`);
      }
      const licenses = await res.json();
      console.log(licenses);
      allLicenses = allLicenses.concat(licenses);
    }

    if (allLicenses.length === 0) {
      throw new Error('No available licenses found');
    }

    // 2. Bulk update all fetched licenses with saleId and soldDate
    await fetch('http://localhost:4000/api/licenses/bulk-update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenseIds: allLicenses.map(l => l.id),
        saleId: sales.id,
        soldDate: new Date().toISOString(),
      }),
    });

    // 3. Update the sale record
    await fetch(`http://localhost:4000/api/sales/${sales.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        soldDate: new Date().toISOString(),
        status: 'completed',
      }),
    });

    console.log(allLicenses);
    
    // 4. Show the licenses in a list
    setPurchasedLicenses(allLicenses);
    setShowLicenseList(true);

    // Navigate to payment success page with license data
    navigate('/payment-success', {
      state: {
        orderDetails: sales,
        purchasedLicenses: allLicenses
      }
    });

  } catch (error) {
    console.error('Payment processing error:', error);
    alert('Error processing payment. Please try again.');
  } finally {
    setIsProcessing(false);
  }
  };

  const paymentUrl = `${window.location.origin}/payment-success?sales=${sales.id}`;

  if (showLicenseList) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <h2 className="text-2xl font-bold mb-6">Payment Successful!</h2>
        <div className="bg-green-50 dark:bg-green-900 p-6 rounded-lg shadow mb-6">
          <h3 className="text-lg font-semibold mb-4 text-green-800 dark:text-green-200">
            Your Licenses ({purchasedLicenses.length})
          </h3>
          <div className="space-y-4">
            {purchasedLicenses.map((license, index) => (
              <div key={license.id} className="p-4 border border-green-200 dark:border-green-700 rounded-lg bg-white dark:bg-green-800">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">License #{index + 1}</span>
                  <span className="text-green-600 dark:text-green-300 capitalize">{license.status}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">License Key</span>
                    <span className="font-mono text-sm">{license.license}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Type</span>
                    <span>{license.type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-300">Users</span>
                    <span>{license.noOfUsers}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
          >
            Return to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">QR Payment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className="bg-gray-800 dark:bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-900">Scan QR Code to Pay</h3>
          <p className="text-center mt-2 text-sm text-gray-500">
            Order ID: {sales.id}
          </p>
          <div className="flex justify-center">
            <QRCodeSVG
              value={paymentUrl}
              size={256}
            />
          </div>
          <p className="text-center text-gray-600">
            Scan this QR code with your payment app
          </p>
        </div>

        {/* Order and License Details */}
        <div className="space-y-6">
          {/* Order Summary */}
          <div className="bg-gray-800 dark:bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-900">Order Summary</h3>
            <div className="space-y-2 dark:text-gray-600">
              <div className="flex justify-between">
                <span>Order ID</span>
                <span className="font-medium">{sales.id}</span>
              </div>
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${sales.salesPrice.toFixed(2)}</span>
              </div>
              {sales.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${sales.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${(sales.salesPrice - sales.discount).toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          
          <button
            onClick={handlePaymentSuccess}
            disabled={isProcessing}
            className={`btn btn-primary w-full ${isProcessing ? 'loading' : ''}`}
          >
            {isProcessing ? 'Processing Payment...' : "I've Completed the Payment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QRPayment;
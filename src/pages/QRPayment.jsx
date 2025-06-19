import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const QRPayment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { orderDetails, sales } = location.state

  useEffect(() => {
    if (!location.state) {
      navigate('/cart');
      return;
    }
    // Store order details in localStorage for mobile access
    localStorage.setItem('currentOrder', JSON.stringify(location.state));

  }, [location.state, navigate]);

  if (!orderDetails) return null;

  const handlePaymentSuccess = async () => {
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
      console.log(licenses)
      allLicenses = allLicenses.concat(licenses);
    }

    // 2. Bulk update all fetched licenses with saleId and soldDate
    await fetch('http://localhost:4000/api/licenses/bulk-update', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        licenseIds: allLicenses.map(l => l.id),
        saleId: sales.id, // Use the saleId from earlier step
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
console.log(allLicenses)
    // 4. Show the licenses in a list
    setPurchasedLicenses(allLicenses);
    setShowLicenseList(true);

  };

  const paymentUrl = `${window.location.origin}/payment-success?sales=${sales.id}`;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">QR Payment</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* QR Code Section */}
        <div className="bg-gray-800 dark:bg-gray-100 p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 dark:text-gray-900 ">Scan QR Code to Pay</h3>
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
            <h3 className="text-lg font-semibold mb-4 dark:text-gray-900 ">Order Summary</h3>
            <div className="space-y-2 dark:text-gray-600 ">
              <div className="flex justify-between ">
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
            onClick={() => handlePaymentSuccess()}
            className="btn btn-primary w-full"
          >
            I've Completed the Payment
          </button>
        </div>
      </div>

    </div>
  );
};

export default QRPayment; 
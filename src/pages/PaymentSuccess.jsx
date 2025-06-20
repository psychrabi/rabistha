import { CheckCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [orderDetails, setOrderDetails] = useState(null);
  const [purchasedLicenses, setPurchasedLicenses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrderDetails = async () => {
      try {
        // Check if data is passed via location state (from QR payment flow)
        if (location.state?.orderDetails && location.state?.purchasedLicenses) {
          setOrderDetails(location.state.orderDetails);
          setPurchasedLicenses(location.state.purchasedLicenses);
          setLoading(false);
          return;
        }

        // Check if sales ID is in URL parameters (for direct access)
        const salesId = searchParams.get('sales');
        if (salesId) {
          // Fetch order details from API
          const response = await fetch(`http://localhost:4000/api/sales/${salesId}`);
          if (response.ok) {
            const saleData = await response.json();
            setOrderDetails(saleData);
            
            // Fetch associated licenses
            const licensesResponse = await fetch(`http://localhost:4000/api/licenses?saleId=${salesId}`);
            if (licensesResponse.ok) {
              const licensesData = await licensesResponse.json();
              setPurchasedLicenses(licensesData);
            }
          }
        }

        // Check localStorage as fallback
        const storedOrder = localStorage.getItem('currentOrder');
        if (storedOrder) {
          const orderData = JSON.parse(storedOrder);
          setOrderDetails(orderData.sales);
          // Clear the stored order after use
          localStorage.removeItem('currentOrder');
        }
      } catch (error) {
        console.error('Error loading order details:', error);
      } finally {
        setLoading(false);
      }
    };

    loadOrderDetails();
  }, [location.state, searchParams]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg"></div>
          <p className="mt-4">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) {
    return (
      <div className="max-w-2xl mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
        <p className="text-gray-600 mb-6">We couldn't find your order details.</p>
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 dark:text-gray-300">Thank you for your purchase</p>
      </div>

      <div className="space-y-6">
        {/* Order Details */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
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
              <span>Payment Method</span>
              <span className="capitalize">{orderDetails.paymentMethod}</span>
            </div>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${orderDetails.salesPrice?.toFixed(2) || '0.00'}</span>
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
                <span>${((orderDetails.salesPrice || 0) - (orderDetails.discount || 0)).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Purchased Licenses */}
        {purchasedLicenses.length > 0 && (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">
              Purchased Licenses ({purchasedLicenses.length})
            </h3>
            <div className="space-y-4">
              {purchasedLicenses.map((license, index) => (
                <div key={license.id} className="p-4 border rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">License #{index + 1}</span>
                    <span className="text-green-600 capitalize">{license.status}</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">License Key</span>
                      <span className="font-mono text-sm break-all">{license.license}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Type</span>
                      <span>{license.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-300">Users</span>
                      <span>{license.noOfUsers}</span>
                    </div>
                    {license.soldDate && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-300">Purchase Date</span>
                        <span>{new Date(license.soldDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Download/Email Instructions */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Important Information</h4>
              <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
                <li>• Save your license keys in a safe place</li>
                <li>• You will receive an email confirmation with your license details</li>
                <li>• Contact support if you need help with installation</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 text-center space-x-4">
        <button
          onClick={() => navigate('/')}
          className="btn btn-primary"
        >
          Return to Home
        </button>
        <button
          onClick={() => window.print()}
          className="btn btn-outline"
        >
          Print Receipt
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {QRCodeSVG} from 'qrcode.react';
import useCartStore from '../store/cartStore';

const Checkout = () => {
  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });
  const [paypalEmail, setPaypalEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { clearCart } = useCartStore();

  // Get order details from navigation state
  const orderDetails = location.state;

  if (!orderDetails) {
    navigate('/cart');
    return null;
  }

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    
    const orderId = Date.now().toString();
    
    if (paymentMethod === 'qr') {
      // Create initial order record
      const orderData = {
        id: orderId,
        paymentMethod,
        ...orderDetails,
        paymentStatus: 'pending',
        timestamp: new Date().toISOString(),
      };

      // Save to localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      existingOrders.push(orderData);
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Navigate to QR payment page with order ID
      navigate('/qr-payment', { 
        state: { ...orderData }
      });
      return;
    }

    const orderData = {
      id: orderId,
      paymentMethod,
      ...orderDetails,
      ...(paymentMethod === 'card' && { cardDetails }),
      ...(paymentMethod === 'paypal' && { paypalEmail }),
      ...(paymentMethod === 'cod' && { paymentStatus: 'pending' }),
      timestamp: new Date().toISOString(),
    };

    try {
      // Get existing orders from localStorage
      const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
      
      // Add new order
      existingOrders.push(orderData);
      
      // Save back to localStorage
      localStorage.setItem('orders', JSON.stringify(existingOrders));

      // Clear cart and navigate to confirmation
      clearCart();
      navigate('/order-confirmation');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Options</h2>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`p-4 border rounded-lg ${paymentMethod === 'card' ? 'border-blue-500 bg-blue-50' : ''}`}
        >
          Credit/Debit Card
        </button>
        <button
          onClick={() => setPaymentMethod('paypal')}
          className={`p-4 border rounded-lg ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : ''}`}
        >
          PayPal
        </button>
        <button
          onClick={() => setPaymentMethod('qr')}
          className={`p-4 border rounded-lg ${paymentMethod === 'qr' ? 'border-blue-500 bg-blue-50' : ''}`}
        >
          QR Scan
        </button>
        <button
          onClick={() => setPaymentMethod('cod')}
          className={`p-4 border rounded-lg ${paymentMethod === 'cod' ? 'border-blue-500 bg-blue-50' : ''}`}
        >
          Cash on Delivery
        </button>
      </div>

      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Card Number"
              className="w-full p-2 border rounded"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({...cardDetails, number: e.target.value})}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="p-2 border rounded"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({...cardDetails, expiry: e.target.value})}
              />
              <input
                type="text"
                placeholder="CVV"
                className="p-2 border rounded"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({...cardDetails, cvv: e.target.value})}
              />
            </div>
            <input
              type="text"
              placeholder="Cardholder Name"
              className="w-full p-2 border rounded"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({...cardDetails, name: e.target.value})}
            />
          </div>
        )}

        {paymentMethod === 'paypal' && (
          <input
            type="email"
            placeholder="PayPal Email"
            className="w-full p-2 border rounded"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
          />
        )}

        {paymentMethod && (
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            {paymentMethod === 'cod' ? 'Place Order' : 'Pay Now'}
          </button>
        )}
      </form>

      {/* Order Summary */}
      <div className="mt-8 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2">
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
    </div>
  );
};

export default Checkout; 
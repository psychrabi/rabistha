import { Banknote, CreditCard, HandCoins, QrCode } from 'lucide-react';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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

    try {
      // 1. Check if user exists
      let userRes = await fetch(`http://localhost:4000/api/users/by-email/${encodeURIComponent(orderDetails.user.email)}`);
      let savedUser;
      if (userRes.ok) {
        savedUser = await userRes.json();
      } else {
        // 2. If not, create user
        userRes = await fetch('http://localhost:4000/api/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderDetails.user),
        });
        if (!userRes.ok) throw new Error('Failed to save user');
        savedUser = await userRes.json();
      }

      if (paymentMethod === 'qr') {
        
        const salesData = {
          userId: savedUser.id,
          paymentMethod,
          paymentStatus: 'pending',
          salesPrice: orderDetails.subtotal,
          discount: orderDetails.discount,
          shippingEmail: orderDetails.user.email,
        };

        // 3. Save order/sale to DB
        const saleRes = await fetch('http://localhost:4000/api/sales', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(salesData)
        });
        if (!saleRes.ok) throw new Error('Failed to save order');
        const savedSale = await saleRes.json();
        
        


        // Navigate to QR payment page with sales array
        navigate('/qr-payment', {
          state: { sales: savedSale, orderDetails: orderDetails }
        });
        return;
      }
    } catch (err) {
      console.log(err.message || 'Checkout failed');
    }



    // Clear cart and navigate to confirmation
    // clearCart();
    // navigate('/order-confirmation');
  };

  return (
    <div className="max-w-lg mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Payment Options</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <button
          onClick={() => setPaymentMethod('card')}
          className={`flex gap-4 p-4 border rounded-lg ${paymentMethod === 'card' ? 'border-blue-500' : ''}`}
        >
          <CreditCard />Credit/Debit Card
        </button>
        <button
          onClick={() => setPaymentMethod('paypal')}
          className={`flex gap-4 p-4 border rounded-lg ${paymentMethod === 'paypal' ? 'border-blue-500' : ''}`}
        >
          <HandCoins /> PayPal
        </button>
        <button
          onClick={() => setPaymentMethod('qr')}
          className={`flex gap-4 p-4 border rounded-lg ${paymentMethod === 'qr' ? 'border-blue-500' : ''}`}
        >
          <QrCode />QR Scan
        </button>
        <button
          onClick={() => setPaymentMethod('cod')}
          className={`flex gap-4 p-4 border rounded-lg ${paymentMethod === 'cod' ? 'border-blue-500' : ''}`}
        >
          <Banknote />Cash on Delivery
        </button>
      </div>

      <form onSubmit={handlePaymentSubmit} className="space-y-4">
        {paymentMethod === 'card' && (
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Cardholder Name"
              className="input w-full p-2  border rounded"
              value={cardDetails.name}
              onChange={(e) => setCardDetails({ ...cardDetails, name: e.target.value })}
            />
            <input
              type="text"
              placeholder="Card Number"
              className="input w-full p-2 border rounded"
              value={cardDetails.number}
              onChange={(e) => setCardDetails({ ...cardDetails, number: e.target.value })}
            />
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="MM/YY"
                className="input p-2 border rounded"
                value={cardDetails.expiry}
                onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
              />
              <input
                type="text"
                placeholder="CVV"
                className="input p-2 border rounded"
                value={cardDetails.cvv}
                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
              />
            </div>

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
      <div className="mt-4 border p-4 rounded-lg">
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
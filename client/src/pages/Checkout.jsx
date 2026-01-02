import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];

  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  const handleCheckout = async () => {
    if (!email) {
      alert('Email is required');
      return;
    }

    try {
      const response = await fetch(
        'http://localhost:8000/api/stripe/create-checkout-session',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartItems, email }),
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url; // Redirect to Stripe checkout
      } else {
        alert('Checkout session failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-indigo-100 p-6 flex items-center justify-center">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 p-8 w-full max-w-md">
        <button
          onClick={() => navigate(-1)}
          className="mb-4 text-gray-700 font-semibold hover:text-gray-900">
          ← Back
        </button>
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Checkout
        </h2>

        {cartItems.length > 0 ? (
          <>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Your Items:
              </h3>
              <ul className="space-y-2 max-h-40 overflow-y-auto">
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    className="flex justify-between">
                    <span>{item.name}</span>
                    <span>₹{item.price.toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span>₹{totalPrice.toLocaleString()}</span>
            </div>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 mb-6 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition">
              Proceed to Payment
            </button>
          </>
        ) : (
          <p className="text-gray-600 text-center">Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Checkout;

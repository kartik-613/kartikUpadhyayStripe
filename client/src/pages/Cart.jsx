import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Cart = () => {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  const navigate = useNavigate();

  const removeItem = index => {
    const newCart = [...cart];
    newCart.splice(index, 1);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));

    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">
      <button
        onClick={() => navigate(-1)} // -1 = previous page
        className="mb-4 text-gray-700 font-semibold hover:text-gray-900">
        ← Back
      </button>

      <h2 className="text-3xl font-bold mb-6 text-gray-800">Your Cart</h2>

      {cart.length === 0 && <p className="text-gray-600">Your cart is empty</p>}

      <div className="space-y-4">
        {cart.map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-4 bg-white/70 backdrop-blur-lg
              rounded-xl p-4 shadow-md border border-white/40">
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-contain rounded-lg bg-white"
              />
            )}

            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <p className="text-green-600 font-bold">₹{item.price}</p>
            </div>

            <button
              onClick={() => removeItem(i)}
              className="bg-red-500 text-white px-3 py-1 rounded-lg
                hover:bg-red-600 transition">
              Remove
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <Link to="/checkout">
          <button
            className="mt-8 w-full md:w-auto bg-gradient-to-r
              from-green-500 to-emerald-600 text-white
              px-8 py-3 rounded-xl font-semibold
              shadow-lg hover:scale-105 transition">
            Proceed to Checkout
          </button>
        </Link>
      )}
    </div>
  );
};

export default Cart;

import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      setCartCount(cart.length);
    };

    updateCart();

    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  return (
    <nav
      className="sticky top-0 z-50 w-full flex items-center justify-between px-8 py-4
      bg-blue/2 backdrop-blur-lg border-b border-blue/3 shadow-lg">
      <div
        onClick={() => navigate('/')}
        className="text-xl font-bold text-gray-900 hover:cursor-pointer">
        MyStore
      </div>

      <Link
        to="/cart"
        className="relative text-gray-900">
        <FaShoppingCart size={24} />

        {cartCount > 0 && (
          <span
            className="absolute -top-2 -right-3 bg-red-500 text-white
            text-xs font-bold px-1.5 py-0.5 rounded-full">
            {cartCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;

import { products } from '../data/products';

const Home = () => {
  const addToCart = product => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    window.dispatchEvent(new Event('cartUpdated'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-indigo-100 to-purple-100 p-6">
      <h2 className="text-3xl font-bold mb-8 text-gray-800">Products</h2>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(p => (
          <div
            key={p.id}
            className="bg-white/70 backdrop-blur-lg rounded-2xl
              shadow-lg border border-white/40
              hover:scale-105 transition duration-300">
            {p.image && (
              <div className="h-48 flex items-center justify-center p-4">
                <img
                  src={p.image}
                  alt={p.name}
                  className="h-full object-contain"
                />
              </div>
            )}

            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">{p.name}</h3>

              <p className="text-green-600 font-bold text-lg mt-1">
                ₹{p.price}
              </p>

              <button
                onClick={() => addToCart(p)}
                className="mt-4 w-full bg-gradient-to-r
                  from-blue-300 to-indigo-400
                  text-white py-2 rounded-xl
                  font-semibold shadow-md
                  hover:opacity-50 transition">
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

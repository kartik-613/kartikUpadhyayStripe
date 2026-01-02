import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';


const Success = () => {
  const [order, setOrder] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem('cart');
  }, []);

    const Home = () => {
      navigate('/'); 
    };
  
  return (
    <div className="min-h-screen bg-green-100 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-700 mb-6">Thank you for your purchase.</p>
        {order && (
          <div className="text-left">
            <h3 className="font-semibold">Purchased Items:</h3>
            {order.items.map((item, i) => (
              <p key={i}>
                {item.name} - ₹{item.price}
              </p>
            ))}
          </div>
        )}
        <button
          onClick={Home}
          className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
          Home
        </button>
      </div>
    </div>
  );
};

export default Success;

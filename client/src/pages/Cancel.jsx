import { useNavigate } from 'react-router-dom';

const Cancel = () => {
 const navigate = useNavigate();

  
  const Home = () => {
    navigate('/'); 
  };
  
  return (
    <div className="min-h-screen bg-red-100 flex items-center justify-center p-6">
      <div className="bg-white/70 backdrop-blur-lg rounded-2xl shadow-lg border border-white/40 p-8 w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-red-600 mb-4">
          Payment Cancelled!
        </h2>
        <p className="text-gray-700">Your payment was not completed.</p>

        <button
          onClick={Home}
          className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
          Home
        </button>
      </div>
    </div>
  );
};

export default Cancel;

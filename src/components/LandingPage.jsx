import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [clickCount, setClickCount] = useState(0);
  const [lastClickTime, setLastClickTime] = useState(0);

  const handleLogoClick = () => {
    const now = Date.now();
    if (now - lastClickTime > 2000) {
      setClickCount(1);
    } else {
      setClickCount(prev => prev + 1);
    }
    setLastClickTime(now);

    if (clickCount + 1 >= 4) {
      navigate('/admin-login');
      setClickCount(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white font-serif">
      {/* Header with Logo */}
      <header className="flex justify-center pt-8">
        <div
          onClick={handleLogoClick}
          className="w-16 h-16 bg-[#D4AF37] rounded-full flex items-center justify-center text-black text-2xl font-bold cursor-pointer shadow-lg hover:shadow-xl transition-shadow duration-300"
          style={{
            boxShadow: '0 0 20px #D4AF37',
            textShadow: '0 0 10px rgba(0,0,0,0.5)'
          }}
        >
          J
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'linear-gradient(45deg, #D4AF37 0%, #f4e87c 50%, #D4AF37 100%)',
            backgroundSize: '200% 200%',
            animation: 'wave 5s ease-in-out infinite'
          }}
        ></div>
        {/* Sparkles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-[#D4AF37] rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`
              }}
            ></div>
          ))}
        </div>

        <h1 className="text-5xl md:text-7xl font-bold text-[#D4AF37] mb-4 z-10" style={{ textShadow: '0 0 20px #D4AF37' }}>
          Joshua Market Place
        </h1>
        <p className="text-xl md:text-2xl mb-2 z-10">
          The Premium Marketplace for Discerning Buyers and Sellers
        </p>
        <p className="text-lg mb-8 z-10 text-[#D4AF37]">
          Luxury • Quality • Trust
        </p>
        <div className="flex space-x-4 z-10">
          <button
            onClick={() => navigate('/signup')}
            className="bg-[#D4AF37] text-black px-6 py-3 rounded-lg font-semibold hover:bg-opacity-80 transition-colors"
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/login')}
            className="border-2 border-[#D4AF37] text-[#D4AF37] px-6 py-3 rounded-lg font-semibold hover:bg-[#D4AF37] hover:text-black transition-colors"
          >
            Sign In
          </button>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">Premium Marketplace</h3>
            <p className="text-gray-300">Discover exclusive items from trusted sellers in our curated luxury marketplace.</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">Secure Transactions</h3>
            <p className="text-gray-300">Enjoy peace of mind with our advanced security measures and encrypted transactions.</p>
          </div>
          <div className="text-center">
            <h3 className="text-2xl font-bold text-[#D4AF37] mb-4">Curated Quality</h3>
            <p className="text-gray-300">Every item is carefully vetted to ensure the highest standards of quality and authenticity.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center border-t border-[#D4AF37] border-opacity-20">
        <a href="#" className="text-[#D4AF37] hover:underline">Help & Support</a>
      </footer>
    </div>
  );
};

export default LandingPage;
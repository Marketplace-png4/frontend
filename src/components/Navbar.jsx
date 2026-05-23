import { NavLink, useNavigate } from 'react-router-dom';
import { clearAuthSession, getStoredUser, isAuthenticated } from '../lib/auth.js';

const Navbar = () => {
  const navigate = useNavigate();
  const user = getStoredUser();
  const loggedIn = isAuthenticated();

  const handleLogout = () => {
    clearAuthSession();
    navigate('/login');
  };

  return (
    <nav className="bg-[#111111] border-b border-[#D4AF37] border-opacity-30 px-4 py-2 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/')} 
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            title="Joshua Luxury Store"
          >
            <img 
              src="/image/my-logo.png" 
              alt="Joshua Luxury Store Logo" 
              className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
            />
            <span className="text-[#D4AF37] font-serif font-bold text-lg sm:text-xl tracking-wider hidden sm:inline-block">J</span>
          </button>
          {loggedIn && user?.accountType && (
            <span className="text-xs sm:text-sm text-[#D4AF37] font-serif uppercase tracking-wide ml-2">
              {user.accountType === 'seller' ? '● SELLER' : '● BUYER'}
            </span>
          )}
        </div>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-1 sm:gap-2">
          <NavLink 
            to="/marketplace" 
            className={({ isActive }) => `px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide transition-colors ${
              isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:text-[#D4AF37]'
            }`}
          >
            Marketplace
          </NavLink>
          {loggedIn && (
            <>
              <NavLink 
                to="/cart" 
                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide transition-colors ${
                  isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                Cart
              </NavLink>
              <NavLink 
                to="/orders" 
                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide transition-colors ${
                  isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                Orders
              </NavLink>
              {user?.accountType === 'seller' && (
                <>
                  <NavLink 
                    to="/seller" 
                    className={({ isActive }) => `px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide transition-colors ${
                      isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:text-[#D4AF37]'
                    }`}
                  >
                    Seller
                  </NavLink>
                  <NavLink 
                    to="/seller/upload" 
                    className={({ isActive }) => `px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide transition-colors ${
                      isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:text-[#D4AF37]'
                    }`}
                  >
                    Upload
                  </NavLink>
                </>
              )}
            </>
          )}
          {!loggedIn ? (
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide transition-colors ${
                  isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                Login
              </NavLink>
              <NavLink 
                to="/signup" 
                className={({ isActive }) => `px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide transition-colors ${
                  isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:text-[#D4AF37]'
                }`}
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <button 
              onClick={handleLogout} 
              className="px-2 sm:px-3 py-2 rounded text-xs sm:text-sm font-serif tracking-wide bg-red-600 text-white hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;


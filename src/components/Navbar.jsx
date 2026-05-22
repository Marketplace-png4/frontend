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
    <nav className="bg-[#111111] border-b border-[#D4AF37] px-4 py-3 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="text-[#D4AF37] font-bold text-xl tracking-wide">
            Joshua Luxury Store
          </button>
          {loggedIn && user?.accountType && (
            <span className="text-sm text-gray-300 hidden sm:inline-block">{user.accountType.toUpperCase()}</span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <NavLink to="/marketplace" className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:bg-white/10'}`}>
            Marketplace
          </NavLink>
          {loggedIn && (
            <>
              <NavLink to="/cart" className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:bg-white/10'}`}>
                Cart
              </NavLink>
              <NavLink to="/orders" className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:bg-white/10'}`}>
                Orders
              </NavLink>
              {user?.accountType === 'seller' && (
                <>
                  <NavLink to="/seller" className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:bg-white/10'}`}>
                    Seller Dashboard
                  </NavLink>
                  <NavLink to="/seller/upload" className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:bg-white/10'}`}>
                    Upload
                  </NavLink>
                </>
              )}
            </>
          )}
          {!loggedIn ? (
            <>
              <NavLink to="/login" className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:bg-white/10'}`}>
                Login
              </NavLink>
              <NavLink to="/signup" className={({ isActive }) => `px-3 py-2 rounded-lg ${isActive ? 'bg-[#D4AF37] text-black' : 'text-white hover:bg-white/10'}`}>
                Sign Up
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="px-3 py-2 rounded-lg bg-red-600 text-white hover:bg-red-500">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

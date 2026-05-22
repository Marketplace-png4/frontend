import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import LandingPage from './components/LandingPage.jsx';
import Signup from './components/Signup.jsx';
import Login from './components/Login.jsx';
import Marketplace from './pages/Marketplace.jsx';
import Cart from './pages/Cart.jsx';
import Orders from './pages/Orders.jsx';
import SellerDashboard from './pages/SellerDashboard.jsx';
import ProductUpload from './pages/ProductUpload.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
        <Route path="/seller" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
        <Route path="/seller/upload" element={<ProtectedRoute><ProductUpload /></ProtectedRoute>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
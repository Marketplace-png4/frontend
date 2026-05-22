import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { saveAuthSession } from '../lib/auth.js';

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.login(formData);
      saveAuthSession({ user: response.user, token: response.token, refreshToken: response.refreshToken });
      setSuccessMessage('Login successful! Redirecting...');

      setTimeout(() => {
        navigate('/marketplace');
      }, 900);
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#111111] border border-[#D4AF37] rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl text-[#D4AF37] font-bold mb-2 text-center">Login</h1>
        <p className="text-gray-400 text-center mb-8">Sign in to your Joshua Luxury Store account</p>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-600 text-white rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-600 text-white rounded-lg text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-bold hover:bg-opacity-80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Don&apos;t have an account? <Link to="/signup" className="text-[#D4AF37] hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
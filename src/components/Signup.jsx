import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../api.js';
import { saveAuthSession } from '../lib/auth.js';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    accountType: '',
    phone: '',
    whatsapp: '',
    streetAddress: '',
    city: '',
    state: '',
    country: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.password) newErrors.password = 'Password is required';
    if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!formData.accountType) newErrors.accountType = 'Please select an account type';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (formData.accountType === 'seller' && !formData.whatsapp) {
      newErrors.whatsapp = 'WhatsApp number is required for sellers';
    }
    if (formData.accountType === 'seller') {
      if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Street address is required for sellers';
      if (!formData.city.trim()) newErrors.city = 'City is required for sellers';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setErrors({});

    try {
      const response = await api.signup(formData);
      saveAuthSession({ user: response.user, token: response.token, refreshToken: response.refreshToken });
      setSuccessMessage('Account created successfully! Redirecting...');
      setTimeout(() => {
        return navigate(formData.accountType === 'seller' ? '/seller' : '/marketplace');
      }, 900);
    } catch (error) {
      console.error('Signup error:', error);
      setErrors({ general: error.message || 'An error occurred during signup. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0b0b] text-white flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-[#111111] border border-[#D4AF37] rounded-3xl p-8 shadow-2xl">
        <h1 className="text-4xl text-[#D4AF37] font-bold mb-2 text-center">Create Account</h1>
        <p className="text-gray-400 text-center mb-8">Join Joshua Luxury Store</p>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-600 text-white rounded-lg text-center">
            {successMessage}
          </div>
        )}

        {errors.general && (
          <div className="mb-6 p-4 bg-red-600 text-white rounded-lg text-center">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="John"
            />
            {errors.firstName && <p className="text-red-400 text-sm mt-1">{errors.firstName}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="Doe"
            />
            {errors.lastName && <p className="text-red-400 text-sm mt-1">{errors.lastName}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Account Type</label>
            <select
              name="accountType"
              value={formData.accountType}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
            >
              <option value="">Select type...</option>
              <option value="seller">Seller</option>
              <option value="buyer">Buyer</option>
            </select>
            {errors.accountType && <p className="text-red-400 text-sm mt-1">{errors.accountType}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="your@email.com"
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="+1234567890"
            />
            {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
          </div>

          {formData.accountType && (
            <div>
              <label className="block text-gray-300 text-sm font-semibold mb-2">WhatsApp Number {formData.accountType === 'seller' ? '(Required)' : '(Optional)'}</label>
              <input
                type="tel"
                name="whatsapp"
                value={formData.whatsapp}
                onChange={handleInputChange}
                className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
                placeholder="+1234567890"
              />
              {errors.whatsapp && <p className="text-red-400 text-sm mt-1">{errors.whatsapp}</p>}
            </div>
          )}

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Street Address</label>
            <input
              type="text"
              name="streetAddress"
              value={formData.streetAddress}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="123 Main Street"
            />
            {errors.streetAddress && <p className="text-red-400 text-sm mt-1">{errors.streetAddress}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="Your City"
            />
            {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">State/Province</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="Your State"
            />
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Country</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="Your Country"
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
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-gray-300 text-sm font-semibold mb-2">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full bg-[#222] border border-[#D4AF37] text-white px-4 py-3 rounded-lg focus:outline-none focus:border-yellow-300"
              placeholder="••••••••"
            />
            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#D4AF37] text-black py-3 rounded-lg font-bold hover:bg-opacity-80 transition-colors disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6">
          Already have an account? <Link to="/login" className="text-[#D4AF37] hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;




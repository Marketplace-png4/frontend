import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';

const SellerDashboard = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadSellerProducts() {
      try {
        setLoading(true);
        const sellerProducts = await api.getMyProducts();
        setProducts(sellerProducts);
      } catch (err) {
        setError(err.message || 'Failed to load your products');
      } finally {
        setLoading(false);
      }
    }
    loadSellerProducts();
  }, []);

  return (
    <div className="min-h-screen bg-[#070707] px-4 py-8 text-white">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-xl shadow-black/20">
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-4xl font-bold text-[#D4AF37]">Seller Dashboard</h1>
              <p className="mt-2 text-gray-300">Manage your listings and access sales-ready features.</p>
            </div>
            <Link to="/seller/upload" className="inline-flex items-center rounded-2xl bg-[#D4AF37] px-5 py-3 text-black font-semibold hover:bg-yellow-400">
              Upload Product
            </Link>
          </div>
        </div>

        {error && <ErrorAlert message={error} />}

        {loading ? (
          <LoadingSpinner message="Loading your products..." />
        ) : products.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 text-center text-gray-300">
            No products created yet. Use the upload tool to add your first listing.
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-2">
            {products.map((product) => (
              <div key={product._id} className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-xl shadow-black/20">
                {product.imageUrl && <img className="mb-4 h-60 w-full rounded-3xl object-cover" src={product.imageUrl} alt={product.title} />}
                <h2 className="text-2xl font-semibold text-white">{product.title}</h2>
                <p className="mt-2 text-gray-300">{product.description}</p>
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full bg-[#D4AF37]/10 px-4 py-2 text-sm text-[#D4AF37]">${product.price?.toFixed(2)}</span>
                  <span className="text-sm text-gray-400">Category: {product.category || 'None'}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SellerDashboard;

import { useEffect, useMemo, useState } from 'react';
import { api } from '../api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { getStoredUser, isAuthenticated } from '../lib/auth.js';

const Marketplace = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    async function loadMarketplace() {
      try {
        setLoading(true);
        const [productList, categoryList] = await Promise.all([api.getProducts(), api.getCategories()]);
        setProducts(productList);
        setCategories(categoryList);
      } catch (err) {
        setError(err.message || 'Failed to load marketplace');
      } finally {
        setLoading(false);
      }
    }
    loadMarketplace();
  }, []);

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const query = search.toLowerCase().trim();
      const matchesSearch = query
        ? product.title.toLowerCase().includes(query) || product.description?.toLowerCase().includes(query)
        : true;
      const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  const handleAddToCart = async (product) => {
    if (!isAuthenticated()) {
      setError('Please log in to add items to your cart.');
      return;
    }
    try {
      setError('');
      await api.addToCart({ productId: product._id, quantity: 1 });
      setSuccess(`Added ${product.title} to your cart.`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message || 'Could not add product to cart');
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] text-white px-4 py-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-xl shadow-black/20">
          <h1 className="text-4xl font-bold text-[#D4AF37]">Marketplace</h1>
          <p className="mt-2 text-gray-300">Browse the latest luxury items and shop safely through our connected backend.</p>
          {success && <div className="mt-4 rounded-2xl bg-green-600/15 p-4 text-green-100">{success}</div>}
          {error && <div className="mt-4 rounded-2xl bg-red-600/15 p-4 text-red-100">{error}</div>}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full max-w-xs rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
            >
              <option value="">All categories</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <LoadingSpinner message="Loading products..." />
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} onAddToCart={handleAddToCart} />
              ))
            ) : (
              <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 text-center text-gray-300">
                No products found. Try a different search or check back soon.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;

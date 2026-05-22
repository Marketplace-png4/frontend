import { useEffect, useState } from 'react';
import { api } from '../api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';
import { getStoredUser } from '../lib/auth.js';

const Cart = () => {
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const user = getStoredUser();

  useEffect(() => {
    async function loadCart() {
      try {
        setLoading(true);
        const cartData = await api.getCart();
        setCart(cartData);
      } catch (err) {
        setError(err.message || 'Failed to load cart');
      } finally {
        setLoading(false);
      }
    }
    loadCart();
  }, []);

  const handleQuantityChange = async (productId, quantity) => {
    const newItems = cart.items.map((item) =>
      item.product._id === productId ? { ...item, quantity } : item
    );
    try {
      setCart((prev) => ({ ...prev, items: newItems }));
      await api.updateCart({ items: newItems.map((item) => ({ product: item.product._id, quantity: item.quantity })) });
      setSuccess('Cart updated successfully');
    } catch (err) {
      setError(err.message || 'Unable to update cart');
    }
  };

  const handleCheckout = async () => {
    try {
      setError('');
      await api.createOrder({ items: cart.items.map((item) => ({ product: item.product._id, quantity: item.quantity, price: item.product.price })), total: cart.total });
      setSuccess('Order submitted successfully. You can view it in Orders.');
      setCart({ items: [], total: 0 });
    } catch (err) {
      setError(err.message || 'Checkout failed');
    }
  };

  if (loading) {
    return <LoadingSpinner message="Loading your cart..." />;
  }

  return (
    <div className="min-h-screen bg-[#070707] px-4 py-8 text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-xl shadow-black/20">
          <h1 className="text-4xl font-bold text-[#D4AF37]">Your Cart</h1>
          <p className="mt-2 text-gray-300">Review items before completing your order.</p>
        </div>

        {error && <ErrorAlert message={error} />}
        {success && <div className="rounded-2xl bg-green-600/15 p-4 text-green-100">{success}</div>}

        <div className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-xl shadow-black/20">
          {cart.items.length === 0 ? (
            <div className="text-center text-gray-300">Your cart is empty. Add products from the marketplace.</div>
          ) : (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div key={item.product._id} className="grid gap-4 rounded-3xl border border-white/10 bg-[#0d0d0d] p-4 sm:grid-cols-[1fr_auto]">
                  <div>
                    <h2 className="font-semibold text-white">{item.product.title}</h2>
                    <p className="text-gray-400 text-sm">{item.product.category || 'Uncategorized'}</p>
                    <p className="mt-2 text-gray-300">${item.product.price.toFixed(2)} each</p>
                  </div>
                  <div className="flex flex-col gap-3 items-end justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-300">
                      Qty
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleQuantityChange(item.product._id, Number(e.target.value) || 1)}
                        className="w-20 rounded-2xl border border-white/10 bg-[#111111] px-3 py-2 text-white"
                      />
                    </label>
                    <span className="text-sm text-gray-300">Subtotal: ${(item.product.price * item.quantity).toFixed(2)}</span>
                  </div>
                </div>
              ))}

              <div className="rounded-3xl border border-white/10 bg-[#0d0d0d] p-6 text-right">
                <p className="text-gray-400">Order total</p>
                <p className="mt-2 text-3xl font-semibold text-[#D4AF37]">${cart.total.toFixed(2)}</p>
                <button onClick={handleCheckout} className="mt-6 w-full rounded-2xl bg-[#D4AF37] px-6 py-3 font-semibold text-black hover:bg-yellow-400">
                  Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

import { useEffect, useState } from 'react';
import { api } from '../api.js';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true);
        const orderData = await api.getOrders();
        setOrders(orderData);
      } catch (err) {
        setError(err.message || 'Failed to load orders');
      } finally {
        setLoading(false);
      }
    }
    loadOrders();
  }, []);

  return (
    <div className="min-h-screen bg-[#070707] px-4 py-8 text-white">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-xl shadow-black/20">
          <h1 className="text-4xl font-bold text-[#D4AF37]">Orders</h1>
          <p className="mt-2 text-gray-300">Track your completed and pending orders.</p>
        </div>
        {error && <ErrorAlert message={error} />}
        {loading ? (
          <LoadingSpinner message="Loading orders..." />
        ) : orders.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 text-center text-gray-300">
            No orders yet. Add products to your cart and complete checkout.
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-xl shadow-black/20">
                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
                  <div>
                    <h2 className="text-2xl font-semibold text-white">Order #{order._id.slice(-6)}</h2>
                    <p className="text-gray-300">Status: <span className="text-[#D4AF37]">{order.status}</span></p>
                  </div>
                  <p className="text-3xl font-bold text-[#D4AF37]">${order.total.toFixed(2)}</p>
                </div>
                <div className="mt-6 space-y-4">
                  {order.items.map((item) => (
                    <div key={item.product._id} className="rounded-2xl border border-white/10 bg-[#0d0d0d] p-4">
                      <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
                        <div>
                          <p className="font-semibold text-white">{item.product.title}</p>
                          <p className="text-gray-400 text-sm">Qty: {item.quantity}</p>
                        </div>
                        <p className="text-gray-300">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;

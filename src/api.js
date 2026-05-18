export const API_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.com';

const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function apiFetch(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || response.statusText || 'API request failed');
  }

  return response.json();
}

export const api = {
  signup: (data) => apiFetch('/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiFetch('/login', { method: 'POST', body: JSON.stringify(data) }),
  getUsers: (token) => apiFetch('/users', { headers: { Authorization: `Bearer ${token}` } }),
  getProducts: () => apiFetch('/products'),
  createProduct: (data, token) =>
    apiFetch('/products', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
  getOrders: (token) => apiFetch('/orders', { headers: { Authorization: `Bearer ${token}` } }),
  createOrder: (data, token) =>
    apiFetch('/orders', {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}` },
      body: JSON.stringify(data),
    }),
};

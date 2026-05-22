import { clearAuthSession } from './lib/auth.js';

export const API_URL = import.meta.env.VITE_API_URL || 'https://new-backend-nlxi.onrender.com';
const defaultHeaders = {
  'Content-Type': 'application/json',
};

async function refreshAuthToken() {
  const refreshToken = localStorage.getItem('jmpRefreshToken');
  if (!refreshToken) {
    throw new Error('Refresh token missing');
  }

  const response = await fetch(`${API_URL}/api/auth/refresh-token`, {
    method: 'POST',
    headers: defaultHeaders,
    body: JSON.stringify({ refreshToken }),
  });

  if (!response.ok) {
    clearAuthSession();
    throw new Error('Session expired. Please sign in again.');
  }

  const data = await response.json();
  localStorage.setItem('jmpToken', data.token);
  return data.token;
}

async function apiFetch(path, options = {}) {
  const token = localStorage.getItem('jmpToken');
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const requestOptions = {
    ...options,
    headers,
  };
  delete requestOptions._retry;

  const response = await fetch(`${API_URL}${path}`, requestOptions);

  if (response.status === 401 && !options._retry) {
    try {
      const newToken = await refreshAuthToken();
      return apiFetch(path, {
        ...options,
        _retry: true,
        headers: {
          ...headers,
          Authorization: `Bearer ${newToken}`,
        },
      });
    } catch (refreshError) {
      throw refreshError;
    }
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.error || response.statusText || 'API request failed');
  }

  return response.json();
}

export const api = {
  signup: (data) => apiFetch('/api/auth/signup', { method: 'POST', body: JSON.stringify(data) }),
  login: (data) => apiFetch('/api/auth/login', { method: 'POST', body: JSON.stringify(data) }),
  me: () => apiFetch('/api/auth/me'),
  refreshToken: (refreshToken) => apiFetch('/api/auth/refresh-token', { method: 'POST', body: JSON.stringify({ refreshToken }) }),
  logout: () => apiFetch('/api/auth/logout', { method: 'POST' }),
  getProducts: () => apiFetch('/api/products'),
  getMyProducts: () => apiFetch('/api/products/mine'),
  getCategories: () => apiFetch('/api/categories'),
  createProduct: (data) => apiFetch('/api/products', { method: 'POST', body: JSON.stringify(data) }),
  getCart: () => apiFetch('/api/cart'),
  addToCart: (data) => apiFetch('/api/cart', { method: 'POST', body: JSON.stringify(data) }),
  updateCart: (data) => apiFetch('/api/cart', { method: 'PUT', body: JSON.stringify(data) }),
  clearCart: () => apiFetch('/api/cart', { method: 'DELETE' }),
  getOrders: () => apiFetch('/api/orders'),
  createOrder: (data) => apiFetch('/api/orders', { method: 'POST', body: JSON.stringify(data) }),
};

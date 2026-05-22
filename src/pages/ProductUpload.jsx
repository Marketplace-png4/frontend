import { useEffect, useState } from 'react';
import { api } from '../api.js';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner.jsx';
import ErrorAlert from '../components/ErrorAlert.jsx';

const ProductUpload = () => {
  const [values, setValues] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCategories() {
      try {
        const list = await api.getCategories();
        setCategories(list);
      } catch (err) {
        console.warn(err);
      }
    }
    loadCategories();
  }, []);

  const handleChange = (event) => {
    const { name, value, files } = event.target;
    setValues((prev) => ({ ...prev, [name]: files ? files[0] : value }));
    setError('');
    setSuccess('');
  };

  const fileToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (err) => reject(err);
    });

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!values.title || !values.price || !values.category || !values.image) {
      setError('Please complete all required fields and upload an image.');
      return;
    }

    try {
      setLoading(true);
      const imageBase64 = await fileToBase64(values.image);
      await api.createProduct({
        title: values.title,
        description: values.description,
        price: Number(values.price),
        category: values.category,
        imageBase64,
        imageName: values.image.name,
      });
      setSuccess('Product uploaded successfully.');
      setValues({ title: '', description: '', price: '', category: '', image: null });
      setTimeout(() => navigate('/seller'), 1200);
    } catch (err) {
      setError(err.message || 'Failed to upload product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#070707] px-4 py-8 text-white">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-xl shadow-black/20">
          <h1 className="text-4xl font-bold text-[#D4AF37]">Upload a Product</h1>
          <p className="mt-2 text-gray-300">Add a new listing for your store and publish it immediately.</p>
        </div>

        {error && <ErrorAlert message={error} />}
        {success && <div className="rounded-2xl bg-green-600/15 p-4 text-green-100">{success}</div>}

        <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-[#111111] p-8 shadow-xl shadow-black/20 space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <label className="space-y-2 text-sm text-gray-300">
              Title
              <input
                name="title"
                value={values.title}
                onChange={handleChange}
                className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="Product name"
                required
              />
            </label>
            <label className="space-y-2 text-sm text-gray-300">
              Price
              <input
                name="price"
                value={values.price}
                onChange={handleChange}
                type="number"
                step="0.01"
                className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
                placeholder="99.99"
                required
              />
            </label>
          </div>

          <label className="space-y-2 text-sm text-gray-300">
            Category
            <select
              name="category"
              value={values.category}
              onChange={handleChange}
              className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
              required
            >
              <option value="">Choose a category</option>
              {categories.map((category) => (
                <option key={category._id} value={category.name}>{category.name}</option>
              ))}
            </select>
          </label>

          <label className="space-y-2 text-sm text-gray-300">
            Description
            <textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              rows="5"
              className="w-full rounded-2xl border border-white/10 bg-[#0b0b0b] px-4 py-3 text-white focus:border-[#D4AF37] focus:outline-none"
              placeholder="Describe the product features"
            />
          </label>

          <label className="space-y-2 text-sm text-gray-300">
            Product image
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
              className="w-full text-sm text-white file:mr-4 file:rounded-full file:border-0 file:bg-[#D4AF37] file:px-4 file:py-2 file:text-black"
              required
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-[#D4AF37] px-6 py-4 text-black font-semibold hover:bg-yellow-400 disabled:opacity-60"
          >
            {loading ? 'Uploading product...' : 'Upload Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProductUpload;

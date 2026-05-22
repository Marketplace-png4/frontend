import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen bg-[#070707] text-white px-4 py-16">
    <div className="mx-auto max-w-3xl rounded-3xl border border-white/10 bg-[#111111] p-10 text-center shadow-xl shadow-black/20">
      <h1 className="text-5xl font-bold text-[#D4AF37]">404</h1>
      <p className="mt-4 text-lg text-gray-300">Page not found. The marketplace URL may have changed.</p>
      <Link className="mt-8 inline-flex rounded-full bg-[#D4AF37] px-6 py-3 text-black font-semibold hover:bg-yellow-400" to="/">
        Back to Home
      </Link>
    </div>
  </div>
);

export default NotFound;

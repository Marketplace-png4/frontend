const ProductCard = ({ product, onAddToCart, actionLabel = 'Add to cart', isSellerView = false }) => {
  return (
    <article className="rounded-3xl border border-white/10 bg-[#111111] p-5 shadow-lg shadow-black/20 transition hover:-translate-y-1 hover:shadow-[#D4AF37]/20">
      {product.imageUrl && (
        <img className="mb-4 h-56 w-full rounded-2xl object-cover" src={product.imageUrl} alt={product.title} />
      )}
      <div className="space-y-3">
        <div>
          <h2 className="text-xl font-semibold text-white">{product.title}</h2>
          <p className="text-sm text-gray-400">{product.category || 'Uncategorized'}</p>
        </div>
        <p className="text-gray-300 line-clamp-3">{product.description || 'No description available.'}</p>
        <div className="flex items-center justify-between gap-4">
          <span className="text-lg font-semibold text-[#D4AF37]">${product.price?.toFixed(2) ?? '0.00'}</span>
          {onAddToCart && (
            <button
              onClick={() => onAddToCart(product)}
              className="rounded-full bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-black transition hover:bg-yellow-400"
            >
              {actionLabel}
            </button>
          )}
        </div>
        {isSellerView && product.createdBy && (
          <p className="text-xs text-gray-400">Seller: {product.createdBy.firstName} {product.createdBy.lastName}</p>
        )}
      </div>
    </article>
  );
};

export default ProductCard;

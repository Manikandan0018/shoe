import React from "react";

function Stars({ value }) {
  const full = Math.floor(value);
  const half = value - full >= 0.5;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-4 h-4 ${
            i < full ? "text-yellow-400" : "text-gray-300"
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.447a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118L10 15.347l-3.37 2.447c-.784.57-1.84-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.644 9.384c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.286-3.957z" />
        </svg>
      ))}
    </div>
  );
}

export default function ProductCard({ product, activeColor = null }) {
  // Apply background if activeColor exists and product has it
  const bg =
    activeColor && product.colors.includes(activeColor) ? activeColor : "#fff";

  return (
    <div className="bg-white rounded shadow-sm p-4">
      <div className="relative">
        {product.isHot && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            HOT
          </div>
        )}
        <div
          className="w-full h-40 rounded flex items-center justify-center overflow-hidden"
          style={{ background: bg }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="object-contain h-full"
            loading="lazy"
          />
        </div>
      </div>

      <div className="mt-3">
        <h4 className="font-semibold text-sm">{product.name}</h4>
        <div className="flex items-center justify-between mt-2">
          <div>
            <div className="text-primary font-semibold">
              ${product.discountPrice.toFixed(2)}
            </div>
            <div className="text-xs text-gray-400 line-through">
              ${product.price.toFixed(2)}
            </div>
            <div className="text-xs text-red-500">
              {product.discountPercent}% Off
            </div>
          </div>
          <div className="text-sm text-right">
            <Stars value={product.ratingValue} />
            <div className="text-xs text-gray-400">{product.ratingCount}</div>
          </div>
        </div>

        <div className="mt-3 flex items-center gap-2">
          {product.colors.map((c) => (
            <span
              key={c}
              className="w-5 h-5 rounded-full border"
              style={{ background: c }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";

function CategoryList({ categories, selectedCategory, onSelect }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="mb-4 bg-white p-4 rounded">
      <div className="flex items-center justify-between">
        <h4 className="font-semibold">Categories</h4>
        <button
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          className="text-sm text-gray-500"
        >
          Toggle
        </button>
      </div>
      {open && (
        <ul className="mt-3 space-y-2 text-sm">
          {categories.map((c) => (
            <li key={c.name} className="flex items-center justify-between">
              <button
                onClick={() => onSelect(c.name)}
                className={`text-left ${
                  selectedCategory === c.name
                    ? "font-semibold text-primary"
                    : ""
                }`}
              >
                {c.name}
              </button>
              <span className="text-gray-400 text-xs">{c.count}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function Sidebar({
  categories = [],
  colors = [],
  selectedCategory,
  setSelectedCategory,
  selectedColors = [],
  toggleColor,
  onReset,
  priceRange,
  setPriceRange,
}) {
  return (
    <div>
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        onSelect={(c) => setSelectedCategory(c === selectedCategory ? "" : c)}
      />

      <div className="mb-4 bg-white p-4 rounded">
        <h4 className="font-semibold">PRICES</h4>
        <div className="mt-3 text-sm">
          Range: ${priceRange[0]} - ${priceRange[1]}
        </div>
        <div className="mt-2 flex gap-2">
          <input
            type="number"
            value={priceRange[0]}
            onChange={(e) =>
              setPriceRange([Number(e.target.value || 0), priceRange[1]])
            }
            className="border px-2 py-1 w-1/2"
          />
          <input
            type="number"
            value={priceRange[1]}
            onChange={(e) =>
              setPriceRange([priceRange[0], Number(e.target.value || 0)])
            }
            className="border px-2 py-1 w-1/2"
          />
        </div>
      </div>

      {/* Color Filter */}
      <div className="mb-4 bg-white p-4 rounded">
        <h4 className="font-semibold">COLOR</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {colors.map((c) => (
            <button
              key={c}
              onClick={() => toggleColor(c)}
              aria-pressed={selectedColors.includes(c)}
              className={`w-7 h-7 rounded-full border-2 ${
                selectedColors.includes(c)
                  ? "border-primary"
                  : "border-gray-300"
              }`}
              style={{ background: c }}
              title={c}
            />
          ))}
        </div>
      </div>

      <div className="mb-4 bg-white p-4 rounded">
        <h4 className="font-semibold">BRAND</h4>
        <ul className="mt-3 text-sm space-y-1">
          <li>
            <button className="text-left">
              Nike <span className="ml-2 text-gray-400">99</span>
            </button>
          </li>
          <li>
            <button className="text-left">
              Adidas <span className="ml-2 text-gray-400">99</span>
            </button>
          </li>
        </ul>
      </div>

      <button
        onClick={onReset}
        className="w-full bg-primary text-white py-2 rounded"
      >
        Reset Filters
      </button>
    </div>
  );
}

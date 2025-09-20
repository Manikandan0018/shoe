import React, { useEffect, useMemo, useState } from "react";
import productsData from "../data/product.js";
import Navbar from "../navbar/Navbar.jsx";
import Sidebar from "../sidebar/Sidebar.jsx";
import ProductCard from "../productCard/ProductCard.jsx";
import Footer from "../footer/Footer.jsx";
import shoe from "../shoe.png";

function useQuery() {
  return new URLSearchParams(window.location.search);
}

export default function Home() {
  // UI state
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedColors, setSelectedColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null); // new state for active color
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name:asc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);

  // sync from URL on mount
  useEffect(() => {
    const q = useQuery();
    if (q.get("category")) setSelectedCategory(q.get("category"));
    if (q.get("colors")) {
      const colors = q.get("colors").split(",").filter(Boolean);
      setSelectedColors(colors);
      setActiveColor(colors[0] || null);
    }
    if (q.get("page")) setPage(Number(q.get("page")));
    if (q.get("sort")) setSortBy(q.get("sort"));
    if (q.get("perPage")) setPerPage(Number(q.get("perPage")));
  }, []);

  // sync to URL on state change
  useEffect(() => {
    const q = new URLSearchParams();
    if (selectedCategory) q.set("category", selectedCategory);
    if (selectedColors.length) q.set("colors", selectedColors.join(","));
    if (page) q.set("page", page);
    if (sortBy) q.set("sort", sortBy);
    if (perPage) q.set("perPage", perPage);
    const url = `${window.location.pathname}?${q.toString()}`;
    window.history.replaceState({}, "", url);
  }, [selectedCategory, selectedColors, page, sortBy, perPage]);

  // handle color selection
 function handleToggleColor(color) {
   setSelectedColors((prev) =>
     prev.includes(color) ? prev.filter((c) => c !== color) : [...prev, color]
   );
 }

  function handleResetFilters() {
    setSelectedCategory("");
    setSelectedColors([]);
    setActiveColor(null);
    setPriceRange([0, 1000]);
    setSearchTerm("");
    setPage(1);
  }

  // derive list of all colors and categories
  const allColors = useMemo(() => {
    const c = new Set();
    productsData.forEach((p) => p.colors.forEach((col) => c.add(col)));
    return Array.from(c);
  }, []);

  const categories = useMemo(() => {
    const c = {};
    productsData.forEach((p) => {
      c[p.category] = (c[p.category] || 0) + 1;
    });
    return Object.entries(c).map(([name, count]) => ({ name, count }));
  }, []);

  // Filtering logic
  const filtered = useMemo(() => {
    return productsData.filter((p) => {
      if (selectedCategory && p.category !== selectedCategory) return false;
      if (selectedColors.length) {
        if (!selectedColors.some((c) => p.colors.includes(c))) return false;
      }
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (!p.name.toLowerCase().includes(q)) return false;
      }
      if (p.discountPrice < priceRange[0] || p.discountPrice > priceRange[1])
        return false;
      return true;
    });
  }, [selectedCategory, selectedColors, searchTerm, priceRange]);

  // Sorting
  const sorted = useMemo(() => {
    const [key, dir] = sortBy.split(":");
    const sortedList = [...filtered].sort((a, b) => {
      if (key === "name") return a.name.localeCompare(b.name);
      if (key === "price") return a.discountPrice - b.discountPrice;
      if (key === "pop") return a.ratingValue - b.ratingValue;
      return 0;
    });
    if (dir === "desc") sortedList.reverse();
    return sortedList;
  }, [filtered, sortBy]);

  // Pagination
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / perPage));
  useEffect(() => {
    if (page > pageCount) setPage(1);
  }, [pageCount]);

  const paginated = useMemo(() => {
    const start = (page - 1) * perPage;
    return sorted.slice(start, start + perPage);
  }, [sorted, page, perPage]);



  


  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenSidebar={() => setSidebarOpen(true)} />
      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* sidebar */}
        <aside className="hidden md:block w-72">
          <Sidebar
            categories={categories}
            colors={allColors}
            selectedCategory={selectedCategory}
            setSelectedCategory={(c) => {
              setSelectedCategory(c);
              setPage(1);
            }}
            selectedColors={selectedColors}
            toggleColor={handleToggleColor}
            onReset={handleResetFilters}
            priceRange={priceRange}
            setPriceRange={(r) => setPriceRange(r)}
          />
        </aside>

        {/* main */}
        <main className="flex-1">
          {/* Hero banner */}
          <div className="bg-sky-400 rounded-md p-6 md:p-8 mb-6 flex flex-col md:flex-row items-center justify-between text-white">
            <div className="text-center md:text-left md:w-1/2">
              <h2 className="text-lg md:text-xl font-semibold">
                Adidas Men Running
              </h2>
              <p className="text-2xl md:text-4xl font-bold opacity-95 mt-2">
                Performance and design. Taken right to the edge.
              </p>
              <button className="mt-4 bg-white text-black px-4 py-2 rounded text-sm md:text-lg hover:bg-cyan-200">
                SHOP NOW
              </button>
            </div>
            <div className="mt-6 md:mt-0 md:w-1/2 flex justify-center">
              <img
                src={shoe}
                alt="hero sneaker"
                className="h-40 sm:h-52 md:h-72 lg:h-80 xl:h-96 object-contain"
              />
            </div>
          </div>

          {/* controls */}
          <div className="bg-white p-3 rounded-md mb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3 text-sm">
              <div className="px-2 py-1 bg-gray-100 rounded">
                {filtered.length} Items
              </div>
              <div>Sort By</div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border rounded px-2 py-1"
                aria-label="Sort products"
              >
                <option value="name:asc">Name (A-Z)</option>
                <option value="name:desc">Name (Z-A)</option>
                <option value="price:asc">Price (Low to High)</option>
                <option value="price:desc">Price (High to Low)</option>
                <option value="pop:desc">Popularity</option>
                <option value="pop:asc">Popularity (Low)</option>
              </select>
              <div>Show</div>
              <select
                value={perPage}
                onChange={(e) => {
                  setPerPage(Number(e.target.value));
                  setPage(1);
                }}
                className="border rounded px-2 py-1"
              >
                <option value={6}>6</option>
                <option value={12}>12</option>
                <option value={24}>24</option>
              </select>
            </div>
            <div className="flex items-center gap-3">
              <input
                aria-label="search"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(1);
                }}
                className="border rounded px-2 py-1 text-sm"
              />
              <button
                onClick={handleResetFilters}
                className="text-sm bg-gray-100 px-3 py-1 rounded"
              >
                Reset
              </button>
              <button
                onClick={() => setSidebarOpen(true)}
                className="md:hidden px-3 py-1 border rounded"
              >
                Filters
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {paginated.length === 0 ? (
              <div className="col-span-full p-6 bg-white rounded text-center">
                <h3 className="font-semibold">No products found</h3>
                <p className="mt-2 text-sm">Try resetting filters.</p>
                <button
                  className="mt-3 bg-primary text-white px-3 py-1 rounded"
                  onClick={handleResetFilters}
                >
                  Reset
                </button>
              </div>
            ) : (
              paginated.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  activeColor={
                    selectedColors[selectedColors.length - 1] || null
                  }
                  // last clicked color applied
                />
              ))
            )}
          </div>

          {/* pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              className="px-3 py-1 border rounded"
            >
              Prev
            </button>

            {(() => {
              const pagesToShow = 4; // number of page buttons to display
              let start = Math.max(1, page - 1); // start page
              let end = Math.min(pageCount, start + pagesToShow - 1);

              // Adjust start if end reached max pages
              start = Math.max(1, end - pagesToShow + 1);

              return Array.from({ length: end - start + 1 }).map((_, i) => {
                const pageNumber = start + i;
                return (
                  <button
                    key={pageNumber}
                    onClick={() => setPage(pageNumber)}
                    className={`px-3 py-1 border rounded ${
                      page === pageNumber ? "bg-primary text-white" : ""
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              });
            })()}

            <button
              disabled={page === pageCount}
              onClick={() => setPage((prev) => Math.min(pageCount, prev + 1))}
              className="px-3 py-1 border rounded"
            >
              Next
            </button>
          </div>
        </main>
      </div>

      {/* mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/30"
            onClick={() => setSidebarOpen(false)}
          ></div>
          <div className="absolute left-0 top-0 bottom-0 w-80 bg-white p-4 overflow-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold">Filters</h3>
              <button
                onClick={() => setSidebarOpen(false)}
                aria-label="Close filters"
                className="px-2 py-1 border rounded"
              >
                Close
              </button>
            </div>
            <Sidebar
              categories={categories}
              colors={allColors}
              selectedCategory={selectedCategory}
              setSelectedCategory={(c) => {
                setSelectedCategory(c);
                setPage(1);
              }}
              selectedColors={selectedColors}
              toggleColor={handleToggleColor}
              onReset={() => {
                handleResetFilters();
                setSidebarOpen(false);
              }}
              priceRange={priceRange}
              setPriceRange={(r) => setPriceRange(r)}
            />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

import React from 'react';
import { Search, Filter, ArrowDownUp, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductControls = React.memo(({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  sortOrder,
  setSortOrder,
}) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-12 items-stretch sm:items-center px-2 sm:px-0">
      
      {/* Search */}
      <div className="relative w-full sm:w-80">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <input
          type="text"
          placeholder="Search products..."
          aria-label="Search products"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-10 py-2.5 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      {/* Category Filter */}
      <div className="relative w-full sm:w-60">
        <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          aria-label="Filter by category"
          className="border rounded px-10 py-2.5 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="">All Categories</option>
          <option value="Food - Meat Substitutes">Food - Meat Substitutes</option>
          <option value="Beverages">Beverages</option>
          <option value="Electronics">Electronics</option>
        </select>
      </div>

      {/* Sort */}
      <div className="relative w-full sm:w-60">
        <ArrowDownUp className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          aria-label="Sort products"
          className="border rounded px-10 py-2.5 w-full appearance-none focus:outline-none focus:ring-2 focus:ring-orange-400"
        >
          <option value="asc">Price: Low → High</option>
          <option value="desc">Price: High → Low</option>
        </select>
      </div>

      {/* Add Product Button */}
      <div className="w-full sm:w-auto sm:ml-auto">
        <button
          onClick={() => navigate('/add-product')}
          className="flex items-center justify-center bg-orange-500 text-white px-4 py-2.5 rounded w-full sm:w-auto hover:bg-orange-600 transition cursor-pointer"
          aria-label="Add new product"
        >
          <Plus size={18} className="mr-2" />
          Add Product
        </button>
      </div>
    </div>
  );
});

export default ProductControls;

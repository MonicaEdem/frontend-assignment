import React, { useEffect, useState, useRef } from 'react';
import { getProducts, deleteProduct } from '../services/productService';
import ProductCard from './productCard';
import ProductControls from './productsfilter';
import ProductModal from './productModal';
import Pagination from '@mui/material/Pagination';
import { MenuItem, Select, FormControl } from '@mui/material';
import { toast } from 'react-toastify';
import Loader from './loader';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(9);

  const productSectionRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getProducts();
        const items = Array.isArray(data) ? data : data.products || [];
        setProducts(items);
        setFilteredProducts(items);
      } catch (err) {
        console.error('Failed to load products:', err);
        setError('Failed to load products');
        toast.error('Unable to fetch products.');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = [...products];

    if (selectedCategory) {
      results = results.filter((p) => p.category === selectedCategory);
    }

    if (searchTerm) {
      results = results.filter((p) =>
        p.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    results.sort((a, b) => {
      const priceA = Number(a.price) || 0;
      const priceB = Number(b.price) || 0;
      return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
    });

    setFilteredProducts(results);
    setCurrentPage(1);
  }, [products, searchTerm, selectedCategory, sortOrder]);

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      const updated = products.filter((p) => p.id !== id);
      setProducts(updated);
      toast.success('Product deleted successfully!');
    } catch (err) {
      console.error('Delete failed:', err);
      toast.error('Failed to delete product. Please try again.');
    }
  };

  const handleCardClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => setSelectedProduct(null);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handleScrollToTop = () => {
    productSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div
      ref={productSectionRef}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"
    >
      {/* Filters */}
      <ProductControls
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-x-10 gap-y-10 justify-items-center">
        {loading ? (
          <p className="text-center col-span-full"><Loader /></p>
        ) : error ? (
          <p className="text-center col-span-full text-red-500">{error}</p>
        ) : currentProducts.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">No products found.</p>
        ) : (
          currentProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onDelete={handleDelete}
              onClick={handleCardClick}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-10 px-4 py-6 bg-white shadow-md rounded-xl flex flex-col sm:flex-row items-center justify-between gap-6 max-w-2xl mx-auto">
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(e, page) => {
              setCurrentPage(page);
              handleScrollToTop();
            }}
            color="primary"
            variant="outlined"
            shape="rounded"
            size="medium"
          />
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium text-gray-700">
              Items per page:
            </label>
            <FormControl size="small" variant="outlined" sx={{ minWidth: 90 }}>
              <Select
                value={itemsPerPage}
                onChange={(e) => {
                  setItemsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                  handleScrollToTop();
                }}
              >
                {[6, 9, 12, 18].map((num) => (
                  <MenuItem key={num} value={num}>
                    {num}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
      )}

      {/* Modal */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={closeModal} />
      )}
    </div>
  );
};

export default ProductList;

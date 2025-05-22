import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProduct, updateProduct } from '../services/productService';
import { toast } from 'react-toastify';

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    rating: '',
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProduct(id);
        setFormData({
          ...product,
          price: product.price.toString(),
          rating: product.rating.toString(),
        });
      } catch (error) {
        console.error('Error fetching product:', error);
        toast.error('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProduct(id, {
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
      });
      toast.success('Product updated successfully!');
      navigate('/'); // Go back to dashboard
    } catch (error) {
      console.error('Update failed:', error);
      toast.error('Update failed. Please try again.');
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600 py-10">Loading product data...</p>;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl text-center font-medium text-orange-500">Edit Product</h2>

      {[{ name: 'name', label: 'Product Name' }, { name: 'description', label: 'Description' }, { name: 'category', label: 'Category' }].map(({ name, label }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="mb-1 font-medium text-gray-700">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type="text"
            value={formData[name]}
            onChange={handleChange}
            placeholder={label}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
            required
          />
        </div>
      ))}

      <div className="flex flex-col">
        <label htmlFor="price" className="mb-1 font-medium text-gray-700">Price ($)</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          required
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="rating" className="mb-1 font-medium text-gray-700">Rating (0 - 5)</label>
        <input
          id="rating"
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 transition"
          required
        />
      </div>

      <div className="flex flex-col gap-2">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md transition"
        >
          Update Product
        </button>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="text-teal-600 hover:text-teal-800 transition text-sm font-medium"
        >
          ← Back to Dashboard
        </button>
      </div>
    </form>
  );
};

export default EditProductForm;

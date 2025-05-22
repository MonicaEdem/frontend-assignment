import React, { useState } from "react";
import { createProduct } from "../services/productService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ProductForm = ({ onSuccess }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    rating: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        ...formData,
        price: parseFloat(formData.price),
        rating: parseFloat(formData.rating),
      });
      toast.success("Product created successfully!");
      if (onSuccess) onSuccess();
      setFormData({
        name: "",
        description: "",
        price: "",
        category: "",
        rating: "",
      });
    } catch (err) {
      console.error("Create error:", err);
      toast.error("Failed to create product. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-lg space-y-6"
    >
      <h2 className="text-2xl font-medium text-orange-500 text-center">
        Add New Product
      </h2>

      {[
        { name: "name", label: "Product Name", type: "text" },
        { name: "description", label: "Description", type: "text" },
        { name: "category", label: "Category", type: "text" },
      ].map(({ name, label, type }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className="mb-1 font-medium text-gray-700">
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={label}
            value={formData[name]}
            onChange={handleChange}
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
            required
          />
        </div>
      ))}

      <div className="flex flex-col">
        <label htmlFor="price" className="mb-1 font-medium text-gray-700">
          Price ($)
        </label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          required
          min="0"
        />
      </div>

      <div className="flex flex-col">
        <label htmlFor="rating" className="mb-1 font-medium text-gray-700">
          Rating (0 - 5)
        </label>
        <input
          id="rating"
          name="rating"
          type="number"
          step="0.1"
          min="0"
          max="5"
          placeholder="Rating"
          value={formData.rating}
          onChange={handleChange}
          className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          required
        />
      </div>

      {/* Buttons container */}
      <div className="flex flex-col gap-2 items-center">
        <button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 rounded-md shadow-md transition cursor-pointer"
        >
          Add Product
        </button>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-teal-600 hover:text-teal-800 transition text-sm font-medium cursor-pointer"
        >
          ← Go to Dashboard
        </button>
      </div>
    </form>
  );
};

export default ProductForm;

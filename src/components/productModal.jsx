import React from 'react';
import { CircleX } from 'lucide-react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  const { name, price = 0, description, category } = product;

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-md flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 border border-gray-200 animate-fade-in">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-full p-2 transition-all"
          aria-label="Close modal"
        >
          <CircleX size={24} />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-orange-600">{name}</h2>
          <p className="text-sm text-teal-600 font-medium tracking-wide">
            Detailed Product Info
          </p>
        </div>

        {/* Info Block */}
        <div className="space-y-5 text-sm text-gray-900">
          <div className="flex justify-between items-center">
            <span className="font-semibold text-teal-700">Category:</span>
            <span className="bg-teal-100 text-teal-800 rounded-full px-3 py-1 text-xs font-semibold">
              {category}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <span className="font-semibold text-teal-700">Price:</span>
            <span className="text-orange-600 font-bold text-lg">
              ${Number(price).toFixed(2)}
            </span>
          </div>

          <div>
            <span className="font-semibold block mb-1 text-teal-700">Description:</span>
            <p className="text-gray-700 leading-relaxed bg-orange-50 border border-orange-200 p-4 rounded-md shadow-sm">
              {description || 'No description provided.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

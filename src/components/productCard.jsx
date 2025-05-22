import React, { useState, useEffect } from 'react';
import { Star, Heart, Pencil, Trash } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { isFavorite, toggleFavorite } from '../utils/favorities';

const ProductCard = ({ product, onDelete, onClick }) => {
  const { id, name, price, category, rating } = product;
  const navigate = useNavigate();
  const [favorited, setFavorited] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    setFavorited(isFavorite(id));
  }, [id]);

 {/* Toggle favorite */} 
  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(id);
    setFavorited(prev => !prev);
  };

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`/edit-product/${id}`);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setConfirmDelete(true);
  };
  const confirmDeleteProduct = (e) => {
    e.stopPropagation();
    onDelete(id);
    setConfirmDelete(false);
  };
  const cancelDelete = (e) => {
    e.stopPropagation();
    setConfirmDelete(false);
  };

  return (
    <div
      className="w-72 bg-white rounded-xl shadow-md overflow-hidden border transform hover:scale-105 transition-transform duration-200 relative cursor-pointer"
      onClick={() => onClick?.(product)}
    >
      <div className="p-4 flex flex-col gap-2">

        {/* Header with name and icons */}
        <div className="flex justify-between items-start">
          <h2 className="text-lg font-semibold text-gray-800">{name}</h2>
          <div className="flex items-center gap-2">
            <button
              onClick={handleEdit}
              className="text-blue-500 hover:text-blue-700 cursor-pointer"
              title="Edit"
              aria-label="Edit product"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`transition ${favorited ? 'text-red-500' : 'text-gray-400 hover:text-red-500'} cursor-pointer`}
              title={favorited ? 'Unfavorite' : 'Favorite'}
              aria-label={favorited ? 'Unfavorite product' : 'Favorite product'}
            >
              <Heart size={18} fill={favorited ? 'currentColor' : 'none'} />
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-red-400 hover:text-red-600 cursor-pointer"
              title="Delete"
              aria-label="Delete product"
            >
              <Trash size={18} />
            </button>
          </div>
        </div>

        {/* Category  */}
        <span className="text-xs bg-gray-100 text-gray-600 rounded-full px-3 py-1 w-fit">
          {category}
        </span>

        {/* Footer with price and rating */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-orange-500 font-bold text-lg">
            ${price ? price.toFixed(2) : '0.00'}
          </span>
          <div className="flex items-center gap-1 text-sm text-yellow-500">
            <Star size={16} fill="currentColor" />
            <span className="text-gray-700">{rating}</span>
          </div>
        </div>
      </div>

      {/* Confirmation */}
      {confirmDelete && (
        <div className="absolute inset-0 bg-white/90 flex flex-col items-center justify-center p-4 text-center z-10 rounded-xl border">
          <p className="mb-4 text-sm text-gray-700">Are you sure you want to delete this product?</p>
          <div className="flex gap-4">
            <button
              onClick={confirmDeleteProduct}
              className="bg-red-500 text-white px-4 py-1 rounded hover:bg-red-600 text-sm cursor-pointer"
            >
              Yes, Delete
            </button>
            <button
              onClick={cancelDelete}
              className="border border-gray-300 px-4 py-1 rounded hover:bg-gray-100 text-sm cursor-pointer"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;

// src/utils/favorites.js
const FAVORITES_KEY = 'favoriteProducts';

export const getFavorites = () => {
  const stored = localStorage.getItem(FAVORITES_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveFavorites = (favorites) => {
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
};

export const toggleFavorite = (id) => {
  const favorites = getFavorites();
  const exists = favorites.includes(id);
  const updated = exists
    ? favorites.filter((favId) => favId !== id)
    : [...favorites, id];

  saveFavorites(updated);
  return updated;
};

export const isFavorite = (id) => {
  return getFavorites().includes(id);
};

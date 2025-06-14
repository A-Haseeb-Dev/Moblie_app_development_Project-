import { useState, useCallback } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);
  
  const toggleFavorite = useCallback((id: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favId => favId !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  }, []);
  
  const isFavorite = useCallback((id: string) => {
    return favorites.includes(id);
  }, [favorites]);
  
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);
  
  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites
  };
}
import { useState, useEffect } from 'react'

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('favorites')) || []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites))
  }, [favorites])

  function toggleFavorite(recipe) {
    setFavorites((prev) =>
      prev.some((f) => f.id === recipe.id)
        ? prev.filter((f) => f.id !== recipe.id)
        : [...prev, recipe]
    )
  }

  return { favorites, toggleFavorite }
}
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'

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
    const alreadyFavorite = favorites.some((f) => f.id === recipe.id)

    setFavorites((prev) =>
      alreadyFavorite
        ? prev.filter((f) => f.id !== recipe.id)
        : [...prev, recipe]
    )

    if (alreadyFavorite) {
      toast.info(`${recipe.name} removed from your recipe book`)
    } else {
      toast.success(`${recipe.name} added to your recipe book`)
    }
  }

  return { favorites, toggleFavorite }
}
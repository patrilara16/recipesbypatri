import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap'
import RecipeCard from '../components/RecipeCard'
import {useFavorites} from '../hooks/useFavorites'

function Home() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    async function loadRecipes() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
        )
        if (!res.ok) throw new Error('Error loading Recipes')
        const data = await res.json()

        const list = (data.meals || []).map((m) => ({
          id: m.idMeal,
          name: m.strMeal,
          image: m.strMealThumb,
          time: `${m.strCategory} · ${m.strArea}`,
        }))
        setRecipes(list)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadRecipes()
  }, [q])

  return (
    <Container className="py-4">
      {q && <h2 className="mb-4">Results for “{q}”</h2>}

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && recipes.length === 0 && (
        <p>No recipes found</p>
      )}

      <Row className="g-4">
        {recipes.map((recipe) => (
          <Col key={recipe.id} xs={12} md={6} lg={4}>
            <RecipeCard
              recipe={recipe}
              isFavorite={favorites.some((f) => f.id === recipe.id)}
              onToggleFavorite={() => toggleFavorite(recipe)}
            />
          </Col>
        ))}
      </Row>
    </Container>
  )
}

export default Home
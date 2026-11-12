import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap'
import RecipeCard from '../components/RecipeCard'
import { useFavorites } from '../hooks/useFavorites'
import { formatInfo } from '../utils/formatInfo'

const PAGE_SIZE = 60
const LETTERS = 'abcdefghijklmnopqrstuvwxyz'.split('')

function Home() {
  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  const [recipes, setRecipes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [visible, setVisible] = useState(PAGE_SIZE)
  const [attempt, setAttempt] = useState(0)
  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    async function loadRecipes() {
      setLoading(true)
      setError(null)
      setVisible(PAGE_SIZE)
      try {
        let meals = []

        if (q) {
          const res = await fetch(
            `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(q)}`
          )
          if (!res.ok) throw new Error('Could not load recipes. Please try again.')
          const data = await res.json()
          meals = data.meals || []
        } else {
          const responses = await Promise.all(
            LETTERS.map((l) =>
              fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${l}`)
            )
          )
          if (responses.some((r) => !r.ok)) {
            throw new Error('Could not load recipes. Please try again.')
          }
          const results = await Promise.all(responses.map((r) => r.json()))
          meals = results.flatMap((d) => d.meals || [])
        }

        const list = meals
          .map((m) => ({
            id: m.idMeal,
            name: m.strMeal,
            image: m.strMealThumb,
            category: formatInfo(m.strCategory, m.strArea),
          }))
          .sort((a, b) => a.name.localeCompare(b.name))

        setRecipes(list)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadRecipes()
  }, [q, attempt])

  const shown = recipes.slice(0, visible)

  return (
    <Container className="py-4">
      <h2 className="mb-2">{q ? `Results for “${q}”` : 'Discover new recipes'}</h2>

      {!loading && !error && recipes.length > 0 && (
        <p className="mb-4">
          Showing {shown.length} of {recipes.length} recipes
        </p>
      )}

      {loading && (
        <div className="text-center py-5">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && (
        <Alert variant="danger" className="text-center">
          <p>{error}</p>
          <Button className="btn-discover" onClick={() => setAttempt(attempt + 1)}>
            Try again
          </Button>
        </Alert>
      )}

      {!loading && !error && recipes.length === 0 && <p>No recipes found</p>}

      <Row className="g-4">
        {shown.map((recipe) => (
          <Col key={recipe.id} xs={12} md={6} lg={4}>
            <RecipeCard
              recipe={recipe}
              isFavorite={favorites.some((f) => f.id === recipe.id)}
              onToggleFavorite={() => toggleFavorite(recipe)}
            />
          </Col>
        ))}
      </Row>

      {!loading && !error && visible < recipes.length && (
        <div className="text-center mt-4">
          <Button
            className="btn-discover"
            onClick={() => setVisible(visible + PAGE_SIZE)}
          >
            Load more
          </Button>
        </div>
      )}
    </Container>
  )
}

export default Home
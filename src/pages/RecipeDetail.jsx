import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap'
import { PiHeartFill, PiHeartLight} from 'react-icons/pi'
import { useFavorites } from '../hooks/useFavorites'
import { formatInfo } from '../utils/formatInfo'


function RecipeDetail() {
  const { id } = useParams()
  const [meal, setMeal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [attempt, setAttempt] = useState(0)
  const { favorites, toggleFavorite } = useFavorites()

  useEffect(() => {
    async function loadRecipe() {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        )
        if (!res.ok) throw new Error('Could not load the recipe')
        const data = await res.json()
        if (!data.meals) throw new Error('Recipe not found')
        setMeal(data.meals[0])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    loadRecipe()
  }, [id, attempt])

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    )
  }

  if (error) {
    return (
      <Container className="py-4">
        <Alert variant="danger" className="text-center">
          <p>{error}</p>
          <Button className="btn-discover me-2" onClick={() => setAttempt(attempt + 1)}>
            Try again
          </Button>
          <Button as={Link} to="/" className="btn-discover">
            Back to home
          </Button>
        </Alert>
      </Container>
    )
  }

  const ingredients = []
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]
    if (name && name.trim() !== '') {
      ingredients.push(`${measure ? measure.trim() : ''} ${name.trim()}`.trim())
    }
  }

  const steps = meal.strInstructions
    .split(/\r?\n/)
    .filter((line) => line.trim() !== '')


  const recipe = {
    id: meal.idMeal,
    name: meal.strMeal,
    image: meal.strMealThumb,
    category: formatInfo(meal.strCategory, meal.strArea)
  }
  const isFavorite = favorites.some((f) => f.id === recipe.id)

  return (
    <Container className="py-4">
      <Row className="g-4">
        <Col md={6}>
          <div className="d-flex justify-content-between align-items-center">
            <h1 className="mb-0">{recipe.name}</h1>
            <button
              className="recipe-card__heart"
              onClick={() => toggleFavorite(recipe)}
              aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
            >
              {isFavorite ? <PiHeartFill /> : <PiHeartLight />}
            </button>
          </div>
          <hr className="recipe-card__divider" />
          <p>{recipe.category}</p>

          <h3>Ingredients</h3>
          <ul>
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </Col>

        <Col md={6}>
          <img src={recipe.image} alt={recipe.name} className="recipe-detail__img" />
          {meal.strYoutube && (
            <Button
              href={meal.strYoutube}
              target="_blank"
              rel="noreferrer"
              className="btn-video rounded-rectangle"
            >
              Watch video
            </Button>
          )}
        </Col>
      </Row>

      <h3 className="mt-4">Recipe</h3>
        <p>{steps}</p>
    </Container>
  )
}

export default RecipeDetail
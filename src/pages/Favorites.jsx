import { Link } from 'react-router-dom'
import { Container, Button } from 'react-bootstrap'
import { PiHeartFill, PiTrashBold } from 'react-icons/pi'
import { useFavorites } from '../hooks/useFavorites'

function Favorites() {
  const { favorites, toggleFavorite } = useFavorites()

  return (
    <Container className="py-4">
      <h1 className="favorites-title mb-4">My recipe book</h1>

      {favorites.length === 0 ? (
        <div className="favorites-empty">
          <p className="mb-3">You don't have any recipes saved yet :(</p>
          <Button as={Link} to="/" className="btn-discover">
            Discover recipes
          </Button>
        </div>
      ) : (
        <ul className="favorites-list">
          {favorites.map((recipe) => (
            <li key={recipe.id} className="favorite-row">
              <Link to={`/recipe/${recipe.id}`} className="favorite-link">
                <div className="favorite-text">
                  <strong>{recipe.name}</strong>
                  <span className="favorite-info">{recipe.time}</span>
                </div>
                <div className="favorite-photo">
                  <img src={recipe.image} alt={recipe.name} />
                </div>
              </Link>
              <button
                className="favorite-remove"
                onClick={() => toggleFavorite(recipe)}
                aria-label={`Remove ${recipe.name} from favorites`}
              >
                <PiTrashBold />
              </button>
            </li>
          ))}
        </ul>
      )}
    </Container>
  )
}
export default Favorites
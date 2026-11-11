import { Link } from 'react-router-dom'
import { PiHeartFill, PiHeartLight } from "react-icons/pi";
import './RecipeCard.css'

function RecipeCard({ recipe, isFavorite, onToggleFavorite }) {
  return (
    <div className="recipe-card">
      <Link to={`/recipe/${recipe.id}`}>
        <img src={recipe.image} alt={recipe.name} className="recipe-card__img" />
      </Link>

      <hr className="recipe-card__divider" />

      <div className="recipe-card__footer">
        <div>
          <p className="recipe-card__name">{recipe.name}</p>
          <p className="recipe-card__time">{recipe.time}</p>
        </div>

        <button
          className="recipe-card__heart"
          onClick={onToggleFavorite}
          aria-label="Add to favorites"
        >
          {isFavorite ? <PiHeartFill /> : <PiHeartLight />}
        </button>
      </div>
    </div>
  )
}

export default RecipeCard
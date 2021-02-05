import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function RecipeCard(props) {
  const { recipes, index, recipeType } = props;

  let cardImage = '';
  let cardName = '';
  let id = '';
  let type = '';
  if (recipeType === 'Comidas' && recipes[index]) {
    cardImage = recipes[index].strMealThumb;
    cardName = recipes[index].strMeal;
    id = recipes[index].idMeal;
    type = 'comidas';
  }
  if (recipeType === 'Bebidas' && recipes[index]) {
    cardImage = recipes[index].strDrinkThumb;
    cardName = recipes[index].strDrink;
    id = recipes[index].idDrink;
    type = 'bebidas';
  }

  return (
    <div className="card" data-testid={ `${index}-recipe-card` }>
      <div className="card-img">
        <img data-testid={ `${index}-card-img` } src={ cardImage } alt="card" />
      </div>
      <div className="card-link">
        <Link to={ `/${type}/${id}` }>
          <p data-testid={ `${index}-card-name` }>{ cardName }</p>
        </Link>
      </div>
    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      strDrink: PropTypes.string,
      strDrinkThumb: PropTypes.string,
      idDrink: PropTypes.string,
    }),
    PropTypes.shape({
      strMeal: PropTypes.string,
      strMealThumb: PropTypes.string,
      idMeal: PropTypes.string,
    }),
  ])
    .isRequired)
    .isRequired,
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
};

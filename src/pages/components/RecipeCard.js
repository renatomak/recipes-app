import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { recipes, index, recipeType } = props;
  let cardImage = '';
  let cardName = '';
  if (recipeType === 'Comidas') {
    cardImage = recipes[index].strMealThumb;
    cardName = recipes[index].strMeal;
  }
  if (recipeType === 'Bebidas') {
    cardImage = recipes[index].strDrinkThumb;
    cardName = recipes[index].strDrink;
  }

  return (
    <div data-testid={ `${index}-recipe-card` }>
      <img data-testid={ `${index}-card-img` } src={ cardImage } alt="card" />
      <p data-testid={ `${index}-card-name` }>{ cardName }</p>
    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipes: PropTypes.arrayOf(PropTypes
    .shape(PropTypes.string
      .isRequired)
    .isRequired)
    .isRequired,
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
};

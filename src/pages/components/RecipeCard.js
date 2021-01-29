import React from 'react';
import PropTypes from 'prop-types';

function RecipeCard(props) {
  const { recipe, index, recipeType } = props;
  let cardImage = '';
  let cardName = '';
  if (recipeType === "Comidas") {
    cardImage = recipe.strMealThumb;
    cardName = recipe.strMeal;
  }
  if (recipeType === "Bebidas") {
    cardImage = recipe.strDrinkThumb;
    cardName = recipe.strDrink;
  }

  return (
    <div datatest-id={`${index}-recipe-card`}>
      <img data-testid={`${index}-card-img`} src={ cardImage } alt='card' />
      <p data-testid={`${index}-card-name`}>{ cardName }</p>
    </div>
  );
}

export default RecipeCard;

RecipeCard.propTypes = {
  recipe: PropTypes.shape(PropTypes.string.isRequired).isRequired,
  index: PropTypes.number.isRequired,
  recipeType: PropTypes.string.isRequired,
};

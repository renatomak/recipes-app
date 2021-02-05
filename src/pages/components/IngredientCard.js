import React from 'react';
import PropTypes from 'prop-types';

function IngredientCard(props) {
  const { ingredients, index, recipeType } = props;

  let cardImage = '';
  let cardName = '';
  if (recipeType === 'Comidas' && ingredients[index]) {
    cardImage = `https://www.themealdb.com/images/ingredients/${ingredients[index].strIngredient}-Small.png`;
    cardName = ingredients[index].strIngredient;
  }
  if (recipeType === 'Bebidas' && ingredients[index]) {
    cardImage = `https://www.thecocktaildb.com/images/ingredients/${ingredients[index].strIngredient1}-Small.png`;
    cardName = ingredients[index].strIngredient1;
  }

  /*   const handleClick = async (ingredient) => {
    let data = [];
    if (recipeType === 'Comidas') {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      data = response.json();
    }
    if (recipeType === 'Bebidas') {
      const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);
      data = response.json();
    }
  }; */

  return (
    <div
      data-testid={ `${index}-ingredient-card` }
      /*       onClick={ () => { handleClick(ingredients[index]); } } */
    >
      <img data-testid={ `${index}-card-img` } src={ cardImage } alt="card" />
      <p data-testid={ `${index}-card-name` }>{ cardName }</p>
    </div>
  );
}

export default IngredientCard;

IngredientCard.propTypes = {
  recipeType: PropTypes.string.isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.oneOfType([
    PropTypes.shape({
      idIngredient: PropTypes.string,
      strIngredient: PropTypes.string,
      strDescription: PropTypes.string,
    }),
    PropTypes.shape({
      strIngredient1: PropTypes.string,
    }),
  ])
    .isRequired)
    .isRequired,
  index: PropTypes.number.isRequired,
};

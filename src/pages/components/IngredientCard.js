import React from 'react';
/* import PropTypes from 'prop-types'; */
import { Link } from 'react-router-dom';

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

  return (
/*     <Link to={ `/${type}/${id}` }> */
      <div data-testid={ `${index}-ingredient-card` }>
        <img data-testid={ `${index}-card-img` } src={ cardImage } alt="card" />
        <p data-testid={ `${index}-card-name` }>{ cardName }</p>
      </div>
/*     </Link> */
  );
}

export default IngredientCard;

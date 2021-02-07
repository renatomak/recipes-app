import React, { useContext, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import RecipeAppContext from '../../context/index';

function IngredientCard(props) {
  const { ingredients, index, recipeType } = props;
  const {
    recipesCards,
    setIngredient,
  } = useContext(RecipeAppContext);
  const history = useHistory();

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

  const handleClick = useCallback(
    async (ingredient) => {
      setIngredient(true);
      let data = [];
      if (recipeType === 'Comidas') {
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient}`);
        data = await response.json();
        const recipes = data.meals;
        recipesCards(recipes);
        history.push('/comidas');
      }
      if (recipeType === 'Bebidas') {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient.strIngredient1}`);
        data = await response.json();
        const recipes = data.drinks;
        recipesCards(recipes);
        history.push('/bebidas');
      }
    }, [],
  );

  return (
    <div className="card-explorar">
      <button
        type="button"
        className="btn-search-ingredients"
        data-testid={ `${index}-ingredient-card` }
        onClick={ () => { handleClick(ingredients[index]); } }
      >
        <div className="btn-img">
          <img
            data-testid={ `${index}-card-img` }
            src={ cardImage }
            alt="card"
            className="img-search"
          />
        </div>
        <div className="btn-name">
          <div>
            <p data-testid={ `${index}-card-name` }>{ cardName }</p>
          </div>
        </div>
      </button>
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

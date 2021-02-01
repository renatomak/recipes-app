import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import RecipeAppContext from '../context/index';
import RecipeCard from './components/RecipeCard';

function TelaPrincipal(props) {
  const { recipeType } = props;

  const {
    recipes,
    setSearchType,
    showInitialCards,
    categories,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    if (recipeType === 'Comidas') {
      setSearchType('Comidas');
    }
    if (recipeType === 'Bebidas') {
      setSearchType('Bebidas');
    }
  }, [setSearchType, recipeType, props]);

  useEffect(() => {
    showInitialCards();
  }, [showInitialCards]);

  /* useEffect(() => {
  const categories = categoryButtonAPIRequest();
  return categories;
}, [categoryButtonAPIRequest]); */

  /* const categories =  categoryButtonAPIRequest(); */
  console.log(categories);

  return (
    <div>
      <Header headerText={ recipeType } showSearchButton="true" />
      {categories.map((category) => (
        <button
          key={ category }
          type="button"
          data-testid={ `${category.strCategory}-category-filter` }
        >
          { category.strCategory }
        </button>
      ))}
      {recipes.map((item, index) => (
        <RecipeCard
          key={ index }
          recipes={ recipes }
          index={ index }
          recipeType={ recipeType }
        />
      ))}
    </div>
  );
}

export default TelaPrincipal;

TelaPrincipal.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

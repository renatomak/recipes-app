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
  } = useContext(RecipeAppContext);

  useEffect(() => {
    if (recipeType === 'Comidas') {
      setSearchType('Comidas');
    }
    if (recipeType === 'Bebidas') {
      setSearchType('Bebidas');
    }
  }, [setSearchType, recipeType, props]);

  console.log(recipes);

  useEffect(() => {
    showInitialCards();
  }, [showInitialCards]);

  return (
    <div>
      <Header headerText={ recipeType } showSearchButton="true" />
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

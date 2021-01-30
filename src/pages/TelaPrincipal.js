import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import RecipeAppContext from '../context/index';
import RecipeCard from './components/RecipeCard';
import Footer from './components/Footer';

function TelaPrincipal(props) {
  const { recipeType } = props;

  const {
    recipes,
  } = useContext(RecipeAppContext);

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
      <Footer />
    </div>
  );
}

export default TelaPrincipal;

TelaPrincipal.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

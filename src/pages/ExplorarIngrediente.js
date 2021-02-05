import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Footer from './components/Footer';
import Header from './components/Header';
import IngredientCard from './components/IngredientCard';

function ExplorarIngrediente(props) {
  const { recipeType } = props;
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false);

  const ingredientsCards = useCallback((data) => {
    let ingredientsList = [];
    const zero = 0;
    const twelve = 12;
    console.log(data.meals);
    if (recipeType === 'Comidas') {
      ingredientsList = data.meals.slice(zero, twelve);
    } else if (recipeType === 'Bebidas') {
      ingredientsList = data.drinks.slice(zero, twelve);
    }
    console.log(ingredientsList);
    setIngredients(ingredientsList);
  }, []);

  const APIRequest = async () => {
    setLoading(true);
    let response = [];
    if (recipeType === 'Comidas') {
      response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list');
    }
    if (recipeType === 'Bebidas') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list');
    }
    const data = await response.json();
    console.log(data);
    ingredientsCards(data);
    setLoading(false);
  };

  useEffect(() => {
    APIRequest();
  }, []);

  return (
    <div>
      <Header headerText="Explorar Ingredientes" showSearchButton="false" />
      {!loading && (
        ingredients.map((item, index) => (
          <IngredientCard
            key={ index }
            ingredients={ ingredients }
            index={ index }
            recipeType={ recipeType }
          />
        ))
      )}
      <Footer />
    </div>
  );
}

export default ExplorarIngrediente;

ExplorarIngrediente.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

import React, { useState, useContext, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import RecipeAppContext from '../context/index';
import RecipeCard from './components/RecipeCard';
import Footer from './components/Footer';
import '../css/style-main.css';
import '../css/recipeCard.css';

function TelaPrincipal(props) {
  const { recipeType } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filterIsSelected, setFilterIsSelected] = useState(false);

  const {
    recipes,
    recipesCards,
    setSearchType,
    ingredient,
    setIngredient,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    if (recipeType === 'Comidas') {
      setSearchType('Comidas');
    }
    if (recipeType === 'Bebidas') {
      setSearchType('Bebidas');
    }
  }, [setSearchType, recipeType, props]);

  const showInitialCards = useCallback(
    async () => {
      let data = {};
      if (recipeType === 'Comidas') {
        if (selectedCategory === '' || filterIsSelected === false) {
          const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
          const result = await response.json();
          data = result.meals;
        } else {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
          const result = await response.json();
          data = result.meals;
        }
      } else if (selectedCategory === '' || filterIsSelected === false) {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        const result = await response.json();
        data = result.drinks;
      } else {
        const response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${selectedCategory}`);
        const result = await response.json();
        data = result.drinks;
      }
      recipesCards(data);
    }, [recipesCards, recipeType, selectedCategory, filterIsSelected],
  );

  useEffect(() => {
    if (!ingredient) {
      showInitialCards();
    }
    if (ingredient) {
      setIngredient(false);
    }
  }, [showInitialCards]);

  const categoryButtonAPIRequest = useCallback(
    async () => {
      setIsLoading(true);
      let data = [];
      const allCategories = [];
      if (recipeType === 'Comidas') {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();
        data.meals.map((meal) => {
          allCategories.push(meal.strCategory);
          return allCategories;
        });
      } else {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list');
        data = await response.json();
        data.drinks.map((drink) => {
          allCategories.push(drink.strCategory);
          return allCategories;
        });
      }
      const fiveCategories = [];
      const five = 5;
      const zero = 0;
      for (let i = zero; i < five; i += 1) {
        fiveCategories.push(allCategories[i]);
      }
      setCategories(fiveCategories);
      setIsLoading(false);
    }, [recipeType],
  );

  useEffect(() => {
    categoryButtonAPIRequest();
  }, [categoryButtonAPIRequest]);

  return (
    <div>
      <Header headerText={ recipeType } showSearchButton="true" />
      <div className="content-main overBackground">
        <div className="contant-main-buttons">
          {!isLoading && categories.map((category) => (
            <button
              key={ category }
              color="secondary"
              variant="contained"
              className="btn-category "
              type="button"
              data-testid={ `${category}-category-filter` }
              onClick={ () => {
                if (selectedCategory !== category) {
                  setFilterIsSelected(true);
                  setSelectedCategory(category);
                  showInitialCards();
                } else if (selectedCategory === category) {
                  setFilterIsSelected(!filterIsSelected);
                  showInitialCards();
                }
              } }
            >
              { `${category}` }
            </button>
          ))}
          {!isLoading && (
            <button
              color="secondary"
              className="btn-category "
              variant="contained"
              type="button"
              data-testid="All-category-filter"
              onClick={ () => {
                setFilterIsSelected(false);
                setSelectedCategory('');
                showInitialCards();
              } }
            >
              All
            </button>
          )}
        </div>
        <div className="wrapper">
          {recipes.map((item, index) => (
            <RecipeCard
              key={ index }
              recipes={ recipes }
              index={ index }
              recipeType={ recipeType }
            />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default TelaPrincipal;

TelaPrincipal.propTypes = {
  recipeType: PropTypes.string.isRequired,
};

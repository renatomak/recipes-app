import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
  const [searchButtonApiResults, setSearchButtonApiResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [radioButton, setRadioButton] = useState('');
  const [searchType, setSearchType] = useState('');
  const [receita, setReceita] = useState({});
  const [ingredientes, setIngredientes] = useState([]);
  const [favorita, setFavorita] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recipes, setRecipes] = useState([]);

  const handleChangeEmail = (value) => setEmail(value);
  const handleChangePassword = (value) => setPassword(value);

  const caseIngredient = useCallback(
    async () => {
      let response = [];
      if (searchType === 'Comidas') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
      } else if (searchType === 'Bebidas') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
      }
      const data = await response.json();
      return data;
    }, [searchTerm, searchType],
  );

  const caseName = useCallback(
    async () => {
      let response = [];
      if (searchType === 'Comidas') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      } else if (searchType === 'Bebidas') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      }
      const data = await response.json();
      return data;
    }, [searchTerm, searchType],
  );

  const caseFirstLetter = useCallback(
    async () => {
      let response = [];
      if (searchTerm.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      } else if (searchType === 'Comidas') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`);
      } else if (searchType === 'Bebidas') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`);
      }
      const data = await response.json();
      return data;
    }, [searchTerm, searchType],
  );

  const recipesCards = useCallback((data) => {
    const recipesList = [];
    const zero = 0;
    const twelve = 12;
    for (let index = zero; index < twelve; index += 1) {
      if (searchType === 'Comidas' && data.meals[index]) {
        recipesList.push(data.meals[index]);
      }
      if (searchType === 'Bebidas' && data.drinks[index]) {
        recipesList.push(data.drinks[index]);
      }
    }
    setRecipes(recipesList);
  }, [searchType]);

  const searchButtonAPIRequest = useCallback(
    async () => {
      let data = {};
      if (radioButton === 'ingredient') {
        data = await caseIngredient();
      } else if (radioButton === 'name') {
        data = await caseName();
      } else if (radioButton === 'first-letter') {
        data = await caseFirstLetter();
      }
      recipesCards(data);
      return data;
    }, [caseFirstLetter,
      caseIngredient,
      caseName,
      radioButton,
      recipesCards,
    ],
  );

  const showInitialCards = useCallback(
    async () => {
      let data = {};
      if (searchType === 'Comidas') {
        console.log('testando');
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        data = await response.json();
        console.log(data);
      }
      if (searchType === 'Bebidas') {
        const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
        data = await response.json();
      }
      recipesCards(data);
    }, [searchType,
      recipesCards],
  );

  const context = {
    receita,
    ingredientes,
    favorita,
    setReceita,
    setIngredientes,
    setFavorita,
    email,
    handleChangeEmail,
    password,
    handleChangePassword,
    searchButtonApiResults,
    searchButtonAPIRequest,
    searchTerm,
    setSearchTerm,
    setRadioButton,
    setSearchType,
    setSearchButtonApiResults,
    recipes,
    setRecipes,
    recipesCards,
    showInitialCards,
  };

  return (
    <RecipeAppContext.Provider value={ context }>
      { children }
    </RecipeAppContext.Provider>
  );
};

export { RecipeAppContext, RecipeAppProvider as Provider };

RecipeAppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

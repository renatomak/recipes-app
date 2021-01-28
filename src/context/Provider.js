import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
  const [searchButtonApiResults, setSearchButtonApiResults] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [radioButton, setRadioButton] = useState('');
  const [searchType, setSearchType] = useState('');

  const caseIngredient = async (response) => {
    if (searchType === 'Comidas') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
    }
    if (searchType === 'Bebidas') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
    }
    return response.json();
  };

  const caseName = async (response) => {
    if (searchType === 'Comidas') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    }
    if (searchType === 'Bebidas') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    }
    return response.json();
  };

  const caseFirstLetter = async (response) => {
    if (searchTerm.length > 1) {
      alert('Sua busca deve conter somente 1 (um) caracter');
    }
    if (searchType === 'Comidas') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`);
    }
    if (searchType === 'Bebidas') {
      response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`);
    }
    return response.json();
  };

  const searchButtonAPIRequest = async () => {
    const response = [];
    let data = {};
    if (radioButton === 'ingredient') {
      data = await caseIngredient(response);
    }
    if (radioButton === 'name') {
      data = await caseName(response);
    }
    if (radioButton === 'first-letter') {
      data = await caseFirstLetter(response);
    }
    console.log(data);
    setSearchButtonApiResults(data);
    console.log(searchButtonApiResults);
  };

  const context = {
    searchButtonApiResults,
    searchButtonAPIRequest,
    searchTerm,
    setSearchTerm,
    setRadioButton,
    setSearchType,
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

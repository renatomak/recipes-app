import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
  const [searchButtonApiResults, setsearchButtonApiResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [radioButton, setRadioButton] = useState('');
  const [searchType, setSearchType] = useState('');

  const searchButtonAPIRequest = async () => {
    let response = [];
    if (radioButton === 'ingredient') {
      if (searchType === 'Comidas') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
      }
      if (searchType === 'Bebidas') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
      }
    }
    if (radioButton === 'name') {
      if (searchType === 'Comidas') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      }
      if (searchType === 'Bebidas') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      }
    }
    if (radioButton === 'first-letter') {
      if (searchTerm.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      if (searchType === 'Comidas') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`);
      }
      if (searchType === 'Bebidas') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchTerm}`);
      }
    }
    const data = await response.json();
    setsearchButtonApiResults(data);
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

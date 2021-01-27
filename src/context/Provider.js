import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '.';

const RecipeAppProvider = ({ children }) => {
  const [searchButtonApiResults, setsearchButtonApiResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [radioButton, setRadioButton] = useState('');

  const searchButtonAPIRequest = async () => {
    let response = [];
    if (radioButton === 'ingredient') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchTerm}`);
    }
    if (radioButton === 'name') {
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
    }
    if (radioButton === 'first-letter') {
      if (searchTerm.length > 1) {
        alert('Sua busca deve conter somente 1 (um) caracter');
      }
      response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${searchTerm}`);
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

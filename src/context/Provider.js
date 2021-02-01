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
  const [idRandon, setIdRandon] = useState('');

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

  const recipeRandon = async (response) => {
    if (searchType === 'Comidas') {
      response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
    }
    if (searchType === 'Bebidas') {
      response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php');
    }
    return response.json();
  };

  const caseName = useCallback(
    async (response) => {
      if (searchType === 'Comidas') {
        response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      }
      if (searchType === 'Bebidas') {
        response = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`);
      }
      return response.json();
  }, [searchTerm, searchType]);

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
    for (let index = zero; (index < twelve && index < data.length); index += 1) {
      recipesList.push(data[index]);
    }
    setRecipes(recipesList);
  }, []);

  const searchButtonAPIRequest = useCallback(
    async () => {
      let data = {};
      if (searchType === 'Comidas') {
        if (radioButton === 'ingredient') {
          const result = await caseIngredient();
          data = result.meals;
        } else if (radioButton === 'name') {
          const result = await caseName();
          data = result.meals;
        } else if (radioButton === 'first-letter') {
          const result = await caseFirstLetter();
          data = result.meals;
        }
      }
      else if (searchType === 'Comidas') {
        if (radioButton === 'ingredient') {
          const result = await caseIngredient();
          data = result.drinks;
        } else if (radioButton === 'name') {
          const result = await caseName();
          data = result.drinks;
        } else if (radioButton === 'first-letter') {
          const result = await caseFirstLetter();
          data = result.drinks;
        }
      }
      recipesCards(data);
      return data;
    }, [caseFirstLetter,
      caseIngredient,
      caseName,
      radioButton,
      recipesCards,
      searchType,
    ],
  );

  const searchIDRandon = async () => {
    const response = [];
    const data = await recipeRandon(response);
    const key = Object.keys(data)[0];
    const obj = data[key][0];
    const keyType = Object.keys(obj)[0];
    const idValue = obj[keyType];
    return idValue;
  };

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
    idRandon,
    setIdRandon,
    searchIDRandon,
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

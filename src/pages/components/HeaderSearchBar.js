import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeAppContext from '../../context/index';

function HeaderSearchBar(props) {
  const {
    searchButtonAPIRequest,
    setSearchTerm,
    setRadioButton,
    setSearchType,
    setRecipes,
  } = useContext(RecipeAppContext);

  const history = useHistory();

  useEffect(() => {
    const { headerText } = props;
    if (headerText === 'Comidas') {
      setSearchType('Comidas');
    }
    if (headerText === 'Bebidas') {
      setSearchType('Bebidas');
    }
  }, [setSearchType, props]);

  const showRecipes = (data) => {
    const { headerText } = props;
    let recipes = [];
    for (let index = 0; index < 12; index++) {
      if (headerText === 'Comidas') {
        if (data.meals[index]) {
          recipes.push(data.meals[index]);
        }
      }
      if (headerText === 'Bebidas') {
        if (data.drinks[index]) {
          recipes.push(data.drinks[index]);
        }
      }
    }
    console.log(recipes);
    setRecipes(recipes);
  }

  const handleClick = async () => {
    const { headerText } = props;
    const data = await searchButtonAPIRequest();
    if (data.meals === null || data.drinks === null) {
      alert('Sinto muito, não encontramos nenhuma receita para esses filtros.');
    } else if (headerText === 'Comidas' && data.meals.length === 1) {
      const id = data.meals[0].idMeal;
      history.push(`/comidas/${id}`);
    } else if (headerText === 'Bebidas' && data.drinks.length === 1) {
      const id = data.drinks[0].idDrink;
      history.push(`/bebidas/${id}`);
    } else {
      showRecipes(data);
    }
  };

  return (
    <div>
      <input
        type="text"
        data-testid="search-input"
        onChange={ ({ target }) => setSearchTerm(target.value) }
      />
      <br />
      <label htmlFor="ingredient">
        <input
          type="radio"
          data-testid="ingredient-search-radio"
          id="ingredient"
          value="ingredient"
          placeholder="Ingrediente"
          name="radio-buttons"
          onChange={ ({ target }) => setRadioButton(target.value) }
        />
        Ingrediente
      </label>
      <br />
      <label htmlFor="name">
        <input
          type="radio"
          data-testid="name-search-radio"
          id="name"
          placeholder="Nome"
          value="name"
          name="radio-buttons"
          onChange={ ({ target }) => setRadioButton(target.value) }
        />
        Nome
      </label>
      <br />
      <label htmlFor="first-letter">
        <input
          type="radio"
          data-testid="first-letter-search-radio"
          id="first-letter"
          placeholder="Primeira letra"
          value="first-letter"
          name="radio-buttons"
          onChange={ ({ target }) => setRadioButton(target.value) }
        />
        Primeira letra
      </label>
      <br />
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ handleClick }
      >
        Buscar
      </button>
    </div>

  );
}

export default HeaderSearchBar;

HeaderSearchBar.propTypes = {
  headerText: PropTypes.string.isRequired,
};

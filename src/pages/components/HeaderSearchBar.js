import React, { useContext } from 'react';
import RecipeAppContext from '../../context/index';

function HeaderSearchBar() {
  const {
    searchButtonAPIRequest,
    setSearchTerm,
    setRadioButton,
  } = useContext(RecipeAppContext);

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
        onClick={ searchButtonAPIRequest }
      >
        Buscar
      </button>
    </div>

  );
}

export default HeaderSearchBar;

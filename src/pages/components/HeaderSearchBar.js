import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import RecipeAppContext from '../../context/index';

function HeaderSearchBar(props) {
  const {
    searchButtonAPIRequest,
    setSearchTerm,
    setRadioButton,
    setSearchType,
    searchButtonApiResults,
    setSearchButtonApiResults,
  } = useContext(RecipeAppContext);

  useEffect(() => {
    const { headerText } = props;
    if (headerText === 'Comidas') {
      setSearchType('Comidas');
    }
    if (headerText === 'Bebidas') {
      setSearchType('Bebidas');
    }
  }, [setSearchType, props]);

  const handleClick = async () => {
    const data = await searchButtonAPIRequest();
    await setSearchButtonApiResults(data);
    console.log(searchButtonApiResults);
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

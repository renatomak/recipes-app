import React, { useState } from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header(props) {
  const { headerText, showSearchButton } = props;
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <a
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        href="/perfil"
      >
        <img src={ profileIcon } alt="Profile icon" />
      </a>
      <h1 data-testid="page-title">{ headerText }</h1>
      {JSON.parse(showSearchButton) && (
        <button
          type="button"
          data-testid="search-top-btn"
          src={ searchIcon }
          onClick={ () => setSearchBar(!searchBar) }
        >
          <img src={ searchIcon } alt="Search icon" />
        </button>
      )}
      {searchBar && (
        <div>
          <input type="text" data-testid="search-input"></input>
          <label htmlFor="ingredient">Ingrediente</label>
          <input type="radio" data-testid="ingredient-search-radio" id="ingredient" placeholder="Ingrediente"></input>
          <label htmlFor="name">Nome</label>
          <input type="radio" data-testid="name-search-radio" id="name" placeholder="Nome"></input>
          <label htmlFor="first-letter">Nome</label>
          <input type="radio" data-testid="first-letter-search-radio" id="first-letter" placeholder="Primeira letra"></input>
          <button type="button" data-testid="exec-search-btn">Buscar</button>
        </div>
      )}
    </div>
  );
}

export default Header;

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showSearchButton: PropTypes.string.isRequired,
};

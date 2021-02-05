import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';
import HeaderSearchBar from './HeaderSearchBar';

function Header(props) {
  const { headerText, showSearchButton } = props;
  const [searchBar, setSearchBar] = useState(false);
  return (
    <div>
      <Link
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
        to="/perfil"
      >
        <img src={ profileIcon } alt="Profile icon" />
      </Link>
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
        <HeaderSearchBar headerText={ headerText } />
      )}
    </div>
  );
}

export default Header;

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showSearchButton: PropTypes.string.isRequired,
};

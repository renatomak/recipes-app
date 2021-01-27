import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header(props) {
  const { headerText, showSearchButton } = props;
  return (
    <header>
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
        >
          <img src={ searchIcon } alt="Search icon" />
        </button>
      )}
    </header>
  );
}

export default Header;

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
  showSearchButton: PropTypes.string.isRequired,
};

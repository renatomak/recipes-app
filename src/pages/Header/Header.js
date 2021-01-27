import React from 'react';
import PropTypes from 'prop-types';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header(props) {
  const { headerText } = props;
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
        src={ profileIcon }
      >
        {/* <img src={ profileIcon } alt="Profile icon" /> */}
      </button>
      <h1 data-testid="page-title">{ headerText }</h1>
      <button
        type="button"
        data-testid="search-top-btn"
        src={ searchIcon }
      >
        {/* <img src={ searchIcon } alt="Search icon" /> */}
      </button>
    </div>
  );
}

export default Header;

Header.propTypes = {
  headerText: PropTypes.string.isRequired,
};

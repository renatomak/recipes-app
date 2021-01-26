import React from 'react';
import profileIcon from '../../images/profileIcon.svg';
import searchIcon from '../../images/searchIcon.svg';

function Header() {
  return (
    <div>
      <button
        type="button"
        data-testid="profile-top-btn"
      >
        <img src={ profileIcon } alt="Profile icon" />
      </button>
      <h1 data-testid="page-title">C&apos;Hookies on top</h1>
      <button
        type="button"
        data-testid="search-top-btn"
      >
        <img src={ searchIcon } alt="Search icon" />
      </button>
    </div>
  );
}

export default Header;

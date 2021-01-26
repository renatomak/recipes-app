import React from 'react';

function Header() {
  return (
    <div>
      <button data-testid="profile-top-btn">Tela de perfil</button>
      <h1 data-testid="page-title">C'Hookies on top</h1>
      <button data-testid="search-top-btn">Buscar</button>
    </div>
  );
}

export default Header;
